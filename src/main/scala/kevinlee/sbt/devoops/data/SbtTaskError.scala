package kevinlee.sbt.devoops.data

import kevinlee.git.GitCommandError
import kevinlee.github.data.GitHubError
import kevinlee.sbt.SbtCommon.messageOnlyException
import kevinlee.semver.{ParseError, SemanticVersion}

/**
  * @author Kevin Lee
  * @since 2019-01-05
  */
sealed trait SbtTaskError

object SbtTaskError {

  // $COVERAGE-OFF$
  final case class GitCommandTaskError(cause: GitCommandError) extends SbtTaskError
  final case class GitTaskError(cause: String) extends SbtTaskError
  final case class GitHubTaskError(cause: GitHubError) extends SbtTaskError
  final case class NoFileFound(name: String, filePaths: List[String]) extends SbtTaskError
  final case class SemVerFromProjectVersionParseError(projectVersion: String, parseError: ParseError) extends SbtTaskError
  final case class VersionNotEligibleForTagging(semVer: SemanticVersion) extends SbtTaskError


  def gitCommandTaskError(cause: GitCommandError): SbtTaskError =
    GitCommandTaskError(cause)

  def gitTaskError(cause: String): SbtTaskError =
    GitTaskError(cause)

  def noFileFound(name: String, filePaths: List[String]): SbtTaskError =
    NoFileFound(name, filePaths)

  def gitHubTaskError(cause: GitHubError): SbtTaskError =
    GitHubTaskError(cause)

  def semVerFromProjectVersionParseError(projectVersion: String, parseError: ParseError): SbtTaskError =
    SemVerFromProjectVersionParseError(projectVersion, parseError)

  def versionNotEligibleForTagging(semVer: SemanticVersion): SbtTaskError =
    VersionNotEligibleForTagging(semVer)

  def render(sbtTaskError: SbtTaskError): String = sbtTaskError match {

    case GitCommandTaskError(err) =>
      s">> ${GitCommandError.render(err)}"

    case GitTaskError(cause) =>
      s"task failed> git command: $cause"

    case GitHubTaskError(cause) =>
      GitHubError.render(cause)

    case NoFileFound(name: String, filePaths) =>
      s"No file found for $name. Expected files: ${filePaths.mkString("[", ",", "]")}"

    case SemVerFromProjectVersionParseError(projectVersion, parseError) =>
      s"Parsing semantic version from project version failed. [projectVersion: $projectVersion, error: ${ParseError.render(parseError)}]"

    case VersionNotEligibleForTagging(semVer) =>
      s"""|  This version is not eligible for tagging. [version: ${semVer.render}]
          |  It should be GA version with any pre-release or meta-info suffix
          |    e.g.)
          |    * 1.0.0 (⭕️)
          |    * 1.0.0-SNAPSHOT (❌)
          |    * 1.0.0-beta (❌)
          |    * 1.0.0+123 (❌)
          |    * 1.0.0-beta+123 (❌)
          |""".stripMargin

  }

  def error(sbtTaskError: SbtTaskError): Nothing =
    messageOnlyException(render(sbtTaskError))

}
