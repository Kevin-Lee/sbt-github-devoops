package kevinlee.http;

import cats.effect.{Blocker, ContextShift, Sync}
import cats.syntax.all._
import cats.{Applicative, Show}
import devoops.data.DevOopsLogLevel
import fs2.Chunk
import io.circe.Encoder
import io.estatico.newtype.macros._
import kevinlee.ops._
import org.http4s.headers.`Content-Type`
import org.http4s.util.CaseInsensitiveString
import org.http4s.{MediaType, Request, Header => Http4sHeader, Headers => Http4sHeaders, Uri => Http4sUri}

import java.net.URL
import scala.concurrent.ExecutionContext

/** @author Kevin Lee
  * @since 2021-01-03
  */
final case class HttpRequest(
  httpMethod: HttpRequest.Method,
  uri: HttpRequest.Uri,
  headers: List[HttpRequest.Header],
  params: List[HttpRequest.Param],
  body: Option[HttpRequest.Body],
) {
  override def toString: String = HttpRequest.show(DevOopsLogLevel.info).show(this)
}

@SuppressWarnings(
  Array(
    "org.wartremover.warts.ImplicitConversion",
    "org.wartremover.warts.ImplicitParameter",
    "org.wartremover.warts.ExplicitImplicitTypes",
    "org.wartremover.warts.PublicInference",
  )
)
object HttpRequest {
  sealed trait Method

  object Method {
    case object Get    extends Method
    case object Post   extends Method
    case object Put    extends Method
    case object Patch  extends Method
    case object Delete extends Method

    def get: Method    = Get
    def post: Method   = Post
    def put: Method    = Put
    def patch: Method  = Patch
    def delete: Method = Delete

    def render(method: Method): String = method match {
      case Get    =>
        "GET"
      case Post   =>
        "POST"
      case Put    =>
        "PUT"
      case Patch  =>
        "PATCH"
      case Delete =>
        "DELETE"
    }

    implicit final val show: Show[Method] = render
  }

  lazy val sensitiveHeadersFromHttp4sInLowerCase: Set[String] = Http4sHeaders.SensitiveHeaders.map(_.value.toLowerCase)

  implicit def show(implicit sbtLogLevel: DevOopsLogLevel): Show[HttpRequest] = { httpRequest =>
    val headerString =
      (
        if (sbtLogLevel.isDebug)
          httpRequest
            .headers
            .map { header =>
              val (name, value) = header.header
              if (shouldProtect(name))
                s"($name: ***Protected***)"
              else
                s"($name: $value)"
            }
            .mkString("[", ", ", "]")
        else
          "***[Not Available in Non-Debug]***"
      )

    val paramsString = httpRequest
      .params
      .map { param =>
        val (name, value) = param.param
        if (shouldProtect(name))
          s"($name: ***Protected***)"
        else
          s"($name: $value)"
      }
      .mkString("[", ", ", "]")
    val bodyString   =
      httpRequest.body.fold("") {
        case HttpRequest.Body.Json(json) =>
          json.spaces2

        case HttpRequest.Body.File(file, blocker) =>
          s"File(file=${file.getCanonicalPath}, blocker=$blocker)"

//        case HttpRequest.Body.Multipart(multipartData) =>
//          multipartData match {
//            case HttpRequest.MultipartData.File(name, file, mediaType, _) =>
//              s"Multipart(name=${name.name}, file=${file.getCanonicalPath}, mediaType=${mediaType.show})"
//            case HttpRequest.MultipartData.Url(name, url, mediaType, _)   =>
//              s"Multipart(name=${name.name}, url=${url.toString}, mediaType=${mediaType.show})"
//          }

      }
    s"HttpRequest(method=${httpRequest.httpMethod.show}, url=${httpRequest.uri.uri}, headers=$headerString, params=$paramsString, body=$bodyString)"
  }

  import org.http4s.circe.CirceEntityCodec._
  import org.http4s.client.dsl.Http4sClientDsl._
  import org.http4s.dsl.request._

  @SuppressWarnings(Array("org.wartremover.warts.Any", "org.wartremover.warts.Nothing"))
  def toHttp4s[F[_]: Applicative: Sync: ContextShift](
    httpRequest: HttpRequest
  ): Either[HttpError, F[Request[F]]] =
    httpRequest.uri.toHttp4s.flatMap { uri =>
      val http4sHeaders = httpRequest.headers.map(_.toHttp4s)
      val uriWithParams =
        httpRequest.params match {
          case Nil    =>
            uri
          case params =>
            params.foldLeft(uri) { (uri, param) =>
              uri.withQueryParam(param.param._1, param.param._2)
            }
        }
      httpRequest.httpMethod match {
        case HttpRequest.Method.Get    =>
          httpRequest
            .body
            .fold(GET.apply(uriWithParams, http4sHeaders: _*).asRight[HttpError]) {
              case HttpRequest.Body.Json(json) =>
                GET
                  .apply(
                    json,
                    uriWithParams,
                    http4sHeaders: _*
                  )
                  .asRight[HttpError]

              case HttpRequest.Body.File(_, _) =>
                HttpError.methodUnsupportedForFileUpload(httpRequest).asLeft[F[Request[F]]]

              // TODO: uncomment it once this issue is solved properly. https://github.com/http4s/http4s/issues/4303
//              case HttpRequest.Body.Multipart(_) =>
//                HttpError.methodUnsupportedForMultipart(httpRequest).asLeft[F[Request[F]]]
            }
        case HttpRequest.Method.Post   =>
          httpRequest
            .body
            .fold(POST.apply(uriWithParams, http4sHeaders: _*).asRight[HttpError]) {
              case HttpRequest.Body.Json(json) =>
                POST
                  .apply(
                    json,
                    uriWithParams,
                    http4sHeaders: _*
                  )
                  .asRight[HttpError]

              case HttpRequest.Body.File(file, blocker) =>
                val byteChunk = fs2.io.file.readAll[F](file.toPath, blocker, 8192).compile.to(Chunk)
                byteChunk
                  .flatMap { chunk =>
                    POST
                      .apply(
                        chunk,
                        uriWithParams,
                        http4sHeaders: _*
                      )
                  }
                  .map(req =>
                    req.withHeaders(
                      req
                        .headers
                        .filterNot(header =>
                          /* Without this filtering, the headers contain "Transfer-Encoding: chunked"
                           * which causes [400, Bad Content-Length] when uploading a release asset file using GitHub API
                           */
                          header.name === CaseInsensitiveString("Transfer-Encoding")
                        )
                    )
                  )
                  .asRight[HttpError]

              // TODO: uncomment it once this issue is solved properly. https://github.com/http4s/http4s/issues/4303
//              case HttpRequest.Body.Multipart(multipartData) =>
//                val body = multipartData.toHttp4s[F]
//                POST
//                  .apply(
//                    body,
//                    uriWithParams,
//                    http4sHeaders: _*
//                  )
//                  .map(req =>
//                    req.withHeaders(
//                      Headers(
//                        req.headers.toList ++ body
//                          .headers
//                          .toList
//                          .filterNot(header =>
//                            /* Without this filtering, the headers contain "Transfer-Encoding: chunked"
//                             * which causes [400, Bad Content-Length] when uploading a release asset file using GitHub API
//                             */
//                            header.name === CaseInsensitiveString("Transfer-Encoding")
//                          )
//                      )
//                    )
//                  )
//                  .asRight[HttpError]
            }
        case HttpRequest.Method.Put    =>
          httpRequest
            .body
            .fold(PUT.apply(uriWithParams, http4sHeaders: _*).asRight[HttpError]) {
              case HttpRequest.Body.Json(json) =>
                PUT
                  .apply(
                    json,
                    uriWithParams,
                    http4sHeaders: _*
                  )
                  .asRight[HttpError]

              case HttpRequest.Body.File(_, _) =>
                HttpError.methodUnsupportedForFileUpload(httpRequest).asLeft[F[Request[F]]]

              // TODO: uncomment it once this issue is solved properly. https://github.com/http4s/http4s/issues/4303
//              case HttpRequest.Body.Multipart(_) =>
//                HttpError.methodUnsupportedForMultipart(httpRequest).asLeft[F[Request[F]]]
            }
        case HttpRequest.Method.Patch  =>
          httpRequest
            .body
            .fold(PATCH.apply(uriWithParams, http4sHeaders: _*).asRight[HttpError]) {
              case HttpRequest.Body.Json(json) =>
                PATCH
                  .apply(
                    json,
                    uriWithParams,
                    http4sHeaders: _*
                  )
                  .asRight[HttpError]

              case HttpRequest.Body.File(_, _) =>
                HttpError.methodUnsupportedForFileUpload(httpRequest).asLeft[F[Request[F]]]

              // TODO: uncomment it once this issue is solved properly. https://github.com/http4s/http4s/issues/4303
//              case HttpRequest.Body.Multipart(_) =>
//                HttpError.methodUnsupportedForMultipart(httpRequest).asLeft[F[Request[F]]]
            }
        case HttpRequest.Method.Delete =>
          httpRequest
            .body
            .fold(DELETE.apply(uriWithParams, http4sHeaders: _*).asRight[HttpError]) {
              case HttpRequest.Body.Json(json) =>
                DELETE
                  .apply(
                    json,
                    uriWithParams,
                    http4sHeaders: _*
                  )
                  .asRight[HttpError]

              case HttpRequest.Body.File(_, _) =>
                HttpError.methodUnsupportedForFileUpload(httpRequest).asLeft[F[Request[F]]]

              // TODO: uncomment it once this issue is solved properly. https://github.com/http4s/http4s/issues/4303
//              case HttpRequest.Body.Multipart(multipartData) =>
//                HttpError.methodUnsupportedForMultipart(httpRequest).asLeft[F[Request[F]]]
            }
      }
    }

  @newtype case class Uri(uri: String) {
    def toHttp4s: Either[HttpError, Http4sUri] =
      Http4sUri
        .fromString(uri)
        .leftMap(parseFailure => HttpError.invalidUri(uri, parseFailure.message))
  }

  @newtype case class Header(header: (String, String)) {
    def toHttp4s: Http4sHeader = Http4sHeader(header._1, header._2)
  }

  @newtype case class Param(param: (String, String))

  sealed trait Body

  object Body {
    final case class Json(json: io.circe.Json)                  extends Body
    // TODO: uncomment it once this issue is solved properly. https://github.com/http4s/http4s/issues/4303
//    final case class Multipart(multipartData: MultipartData) extends Body
    final case class File(file: java.io.File, blocker: Blocker) extends Body

    def json(json: io.circe.Json): Body = Json(json)

    // TODO: uncomment it once this issue is solved properly. https://github.com/http4s/http4s/issues/4303
//    def multipart(multipartData: MultipartData): Body = Multipart(multipartData)

    def file(file: java.io.File, blocker: Blocker): Body = File(file, blocker)
  }

  sealed trait MultipartData

  object MultipartData {
    final case class File(
      name: Name,
      file: java.io.File,
      mediaTypes: List[MediaType],
      blocker: Blocker,
    ) extends MultipartData

    final case class Url(
      name: Name,
      url: URL,
      mediaTypes: List[MediaType],
      blocker: Blocker,
    ) extends MultipartData

    def file(
      name: Name,
      file: java.io.File,
      mediaTypes: List[MediaType],
      blocker: Blocker,
    ): MultipartData =
      File(name, file, mediaTypes, blocker)

    def url(
      name: Name,
      url: URL,
      mediaTypes: List[MediaType],
      blocker: Blocker,
    ): MultipartData = Url(name, url, mediaTypes, blocker)

    @newtype case class Name(name: String)

    import org.http4s.multipart.{Part, Multipart => Http4sMultipart}

    implicit final class MultipartDataOps(val multipartData: MultipartData) extends AnyVal {
      def toHttp4s[F[_]: Sync: ContextShift]: Http4sMultipart[F] =
        MultipartData.toHttp4s(multipartData)
    }

    def toHttp4s[F[_]: Sync: ContextShift](multipartData: MultipartData): Http4sMultipart[F] =
      Http4sMultipart[F](
        multipartData match {
          case File(name, file, mediaTypes, blocker) =>
            Vector(
              Part.fileData(
                name.name,
                file,
                blocker,
                mediaTypes.map(`Content-Type`(_)): _*
              )
            )

          case Url(name, url, mediaTypes, blocker) =>
            Vector(
              Part.fileData(
                name.name,
                url,
                blocker,
                mediaTypes.map(`Content-Type`(_)): _*
              )
            )

        }
      )
  }

  implicit final class HttpRequestOps(val httpRequest: HttpRequest) extends AnyVal {
    def withHeader(header: Header): HttpRequest =
      httpRequest.copy(headers = httpRequest.headers :+ header)

    def toHttp4s[F[_]: Applicative: Sync: ContextShift]: Either[HttpError, F[Request[F]]] =
      HttpRequest.toHttp4s[F](httpRequest)

    // TODO: uncomment it once this issue is solved properly. https://github.com/http4s/http4s/issues/4303
//    def isBodyMultipart: Boolean =
//      httpRequest.body match {
//        case Some(HttpRequest.Body.Multipart(_)) =>
//          true
//        case _                                   =>
//          false
//      }
  }

  def withParams(httpMethod: Method, uri: Uri, params: List[Param]): HttpRequest =
    HttpRequest(httpMethod, uri, List.empty[Header], params, none[HttpRequest.Body])

  def withBody(httpMethod: Method, uri: Uri, body: HttpRequest.Body): HttpRequest =
    HttpRequest(httpMethod, uri, List.empty[Header], List.empty[Param], body.some)

  def withHeaders(httpMethod: Method, uri: Uri, headers: List[Header]): HttpRequest =
    HttpRequest(httpMethod, uri, headers, List.empty[Param], none[HttpRequest.Body])

  def withHeadersAndJsonBody[A: Encoder](
    httpMethod: Method,
    uri: Uri,
    headers: List[Header],
    body: A,
  ): HttpRequest =
    HttpRequest(
      httpMethod,
      uri,
      headers,
      List.empty[Param],
      HttpRequest.Body.json(Encoder[A].apply(body)).some,
    )

  def withHeadersParamsAndFileBody(
    httpMethod: Method,
    uri: Uri,
    headers: List[Header],
    params: List[Param],
    file: java.io.File,
  )(implicit ec: ExecutionContext): HttpRequest =
    HttpRequest(
      httpMethod,
      uri,
      headers,
      params,
      HttpRequest.Body.file(file, Blocker.liftExecutionContext(ec)).some,
    )

//  def withHeadersParamsAndMultipartBody(
//    httpMethod: Method,
//    uri: Uri,
//    headers: List[Header],
//    params: List[Param],
//    multipartData: MultipartData,
//  ): HttpRequest =
//    HttpRequest(
//      httpMethod,
//      uri,
//      headers,
//      params,
//      HttpRequest.Body.multipart(multipartData).some,
//    )

  def withoutBody(httpMethod: Method, uri: Uri): HttpRequest =
    HttpRequest(httpMethod, uri, List.empty[Header], List.empty[Param], none[HttpRequest.Body])

}
