package devoops

import just.semver.{ParseError, SemVer}
import kevinlee.sbt.SbtCommon._
import sbt.Keys._
import sbt.plugins.JvmPlugin
import sbt.{AutoPlugin, CircularDependencyLevel, Compile, PluginTrigger, Setting, SettingKey, plugins, settingKey, _}

/**
  * @author Kevin Lee
  * @since 2018-12-29
  */
object DevOopsScalaPlugin extends AutoPlugin {

  // $COVERAGE-OFF$
  override def requires: JvmPlugin.type = plugins.JvmPlugin
  override def trigger: PluginTrigger = allRequirements

  object autoImport {

    val essentialOptions: Seq[String] = Seq(
      "-language:higherKinds"             // Allow higher-kinded types
    , "-encoding", "UTF-8"                // Specify character encoding used by source files.
    )

    val defaultOptions: Seq[String] = Seq(
      "-deprecation"                      // Emit warning and location for usages of deprecated APIs.
    , "-unchecked"                        // Enable additional warnings where generated code depends on assumptions.
    , "-feature"                          // Emit warning and location for usages of features that should be imported explicitly.
    , "-Xfatal-warnings"                  // Fail the compilation if there are any warnings.
    )

    lazy private val scala3cLanguageOptions =
      "-language:" + List(
        "dynamics",
        "existentials",
        "higherKinds",
        "reflectiveCalls",
        "experimental.macros",
        "implicitConversions",
        "strictEquality",
      ).mkString(",")

    val scala3Options: Seq[String] = Seq(
      "-unchecked",
      "-deprecation",
      "-feature",
      "-Xfatal-warnings",
      scala3cLanguageOptions,
      "-explain",
    )

    val defaultOptions2_10: Seq[String] = Seq(
      "-Ywarn-dead-code"                  // Warn when dead code is identified.
    , "-Ywarn-value-discard"              // Warn when non-Unit expression results are unused.
    , "-Yno-adapted-args"                 // Do not adapt an argument list (either by inserting () or creating a tuple) to match the receiver.
    , "-Ywarn-inaccessible"               // Warn about inaccessible types in method signatures.
    , "-Ywarn-nullary-override"           // Warn when non-nullary `def f()' overrides nullary `def f'.
    )

    val defaultOptionsBefore2_13: Seq[String] = defaultOptions2_10 ++ Seq(
      "-Ywarn-numeric-widen"              // Warn when numerics are widened.
    )

    val defaultOptions2_13: Seq[String] = Seq(
        "-Wdead-code"               // Warn when dead code is identified.
      , "-Wvalue-discard"           // Warn when non-Unit expression results are unused.
      , "-Xlint:adapted-args"       // Warn if an argument list is modified to match the receiver.
      , "-Xlint:inaccessible"       // Warn about inaccessible types in method signatures.
      , "-Xlint:nullary-override"   // Warn when non-nullary def f()' overrides nullarydef f’.
      , "-Wnumeric-widen"           // Warn when numerics are widened.
      , "-Ymacro-annotations"
    )

    val defaultOptions2_13_3_and_higher: Seq[String] = Seq(
        "-Wdead-code"               // Warn when dead code is identified.
      , "-Wvalue-discard"           // Warn when non-Unit expression results are unused.
      , "-Xlint:adapted-args"       // Warn if an argument list is modified to match the receiver.
      , "-Xlint:inaccessible"       // Warn about inaccessible types in method signatures.
      , "-Wnumeric-widen"           // Warn when numerics are widened.
      , "-Ymacro-annotations"
    )

    val scalacOptions2_13: Seq[String] = Seq(
        "-Wunused:imports"                // Warn if an import selector is not referenced.
      , "-Xlint:nullary-unit"             // Warn when nullary methods return Unit.
      , "-Xlint:infer-any"                // Warn when a type argument is inferred to be Any.
      , "-Xlint:missing-interpolator"     // A string literal appears to be missing an interpolator id.
      , "-Xlint:doc-detached"             // A Scaladoc comment appears to be detached from its element.
      , "-Xlint:private-shadow"           // A private field (or class parameter) shadows a superclass field.
      , "-Xlint:type-parameter-shadow"    // A local type parameter shadows a type already in scope.
      , "-Xlint:poly-implicit-overload"   // Parameterized overloaded implicit methods are not visible as view bounds.
      , "-Xlint:option-implicit"          // Option.apply used implicit view.
      , "-Xlint:delayedinit-select"       // Selecting member of DelayedInit.
      , "-Xlint:package-object-classes"   // Class or object defined in package object.
      , "-Xlint:stars-align"              // Pattern sequence wildcard must align with sequence component.
      , "-Xlint:constant"                 // Evaluation of a constant arithmetic expression results in an error.
    )

    val scalacOptions2_12: Seq[String] = Seq(
        "-Xlint:adapted-args"               // Warn if an argument list is modified to match the receiver.
      , "-Xlint:by-name-right-associative"  // By-name parameter of right associative operator.
      , "-Xlint:delayedinit-select"         // Selecting member of DelayedInit.
      , "-Xlint:doc-detached"               // A Scaladoc comment appears to be detached from its element.
      , "-Xlint:inaccessible"               // Warn about inaccessible types in method signatures.
      , "-Xlint:infer-any"                  // Warn when a type argument is inferred to be `Any`.
      , "-Xlint:missing-interpolator"       // A string literal appears to be missing an interpolator id.
      , "-Xlint:nullary-override"           // Warn when non-nullary `def f()' overrides nullary `def f'.
      , "-Xlint:nullary-unit"               // Warn when nullary methods return Unit.
      , "-Xlint:option-implicit"            // Option.apply used implicit view.
      , "-Xlint:package-object-classes"     // Class or object defined in package object.
      , "-Xlint:poly-implicit-overload"     // Parameterized overloaded implicit methods are not visible as view bounds.
      , "-Xlint:private-shadow"             // A private field (or class parameter) shadows a superclass field.
      , "-Xlint:stars-align"                // Pattern sequence wildcard must align with sequence component.
      , "-Xlint:type-parameter-shadow"      // A local type parameter shadows a type already in scope.
      , "-Xlint:unsound-match"              // Pattern match may not be typesafe.
      , "-Ywarn-unused-import"
      , "-Xlint:constant"                   // Evaluation of a constant arithmetic expression results in an error.
      , "-Ypartial-unification"
    )

    val scalacOptions2_11: Seq[String] = Seq(
      "-Xlint:adapted-args"               // Warn if an argument list is modified to match the receiver.
    , "-Xlint:by-name-right-associative"  // By-name parameter of right associative operator.
    , "-Xlint:delayedinit-select"         // Selecting member of DelayedInit.
    , "-Xlint:doc-detached"               // A Scaladoc comment appears to be detached from its element.
    , "-Xlint:inaccessible"               // Warn about inaccessible types in method signatures.
    , "-Xlint:infer-any"                  // Warn when a type argument is inferred to be `Any`.
    , "-Xlint:missing-interpolator"       // A string literal appears to be missing an interpolator id.
    , "-Xlint:nullary-override"           // Warn when non-nullary `def f()' overrides nullary `def f'.
    , "-Xlint:nullary-unit"               // Warn when nullary methods return Unit.
    , "-Xlint:option-implicit"            // Option.apply used implicit view.
    , "-Xlint:package-object-classes"     // Class or object defined in package object.
    , "-Xlint:poly-implicit-overload"     // Parameterized overloaded implicit methods are not visible as view bounds.
    , "-Xlint:private-shadow"             // A private field (or class parameter) shadows a superclass field.
    , "-Xlint:stars-align"                // Pattern sequence wildcard must align with sequence component.
    , "-Xlint:type-parameter-shadow"      // A local type parameter shadows a type already in scope.
    , "-Xlint:unsound-match"              // Pattern match may not be typesafe.
    , "-Ywarn-unused-import"
    , "-Ypartial-unification"
    )

    val aggressiveScalacOptions2_13: Seq[String] = Seq(
        "-Wextra-implicit"    // Warn when more than one implicit parameter section is defined.
      , "-Woctal-literal"     // Warn on obsolete octal syntax.
      // Is it necessary?
      //          , "-Wself-implicit"  // Warn when an implicit resolves to an enclosing self-definition.
      , "-Wunused:imports"    // Warn if an import selector is not referenced.
      , "-Wunused:patvars"    // Warn if a variable bound in a pattern is unused.
      , "-Wunused:privates"   // Warn if a private member is unused.
      , "-Wunused:locals"     // Warn if a local definition is unused.
      , "-Wunused:explicits"  // Warn if an explicit parameter is unused.
      , "-Wunused:implicits"  // Warn if an implicit parameter is unused.
      , "-Wunused:params"     // Enable -Wunused:explicits,implicits.
      , "-Wunused:linted"     // -Xlint:unused.
      , "-Xlint:_"            // Enable lint
    )

    val aggressiveScalacOptions2_11: Seq[String] = Seq(
      "-explaintypes"                     // Explain type errors in more detail.
    , "-Xlint:_"
    , "-Ywarn-infer-any"                  // Warn when a type argument is inferred to be `Any`.
    , "-Ywarn-nullary-unit"               // Warn when nullary methods return Unit.
    , "-Ywarn-unused"
    , "-Ywarn-unused-import"
    , "-Ypartial-unification"
    )

    val aggressiveScalacOptions2_12: Seq[String] =
      (aggressiveScalacOptions2_11 ++ Seq(
        "-Ywarn-extra-implicit"             // Warn when more than one implicit parameter section is defined.
      , "-Ywarn-unused:implicits"           // Warn if an implicit parameter is unused.
      , "-Ywarn-unused:imports"             // Warn if an import selector is not referenced.
      , "-Ywarn-unused:locals"              // Warn if a local definition is unused.
      , "-Ywarn-unused:params"              // Warn if a value parameter is unused.
      , "-Ywarn-unused:patvars"             // Warn if a variable bound in a pattern is unused.
      , "-Ywarn-unused:privates"            // Warn if a private member is unused.
      )).distinct

    lazy val useAggressiveScalacOptions: SettingKey[Boolean] = settingKey("The flag to add aggressive scalac options")
  }

  import autoImport._

  def versionSpecificScalacOptions(
    useAggressiveScalacOptions: Boolean
  ): PartialFunction[(SemVer.Major, SemVer.Minor, SemVer.Patch), Seq[String]] = {
      case (SemVer.Major(2), SemVer.Minor(10), _) =>
        essentialOptions ++ defaultOptions ++ defaultOptions2_10

      case (SemVer.Major(2), SemVer.Minor(11), _) =>
        essentialOptions ++ defaultOptions ++ (
          if (useAggressiveScalacOptions) {
            defaultOptionsBefore2_13 ++ aggressiveScalacOptions2_11
          } else {
            defaultOptionsBefore2_13 ++ scalacOptions2_11
          }
        )

      case (SemVer.Major(2), SemVer.Minor(12), _) =>
        essentialOptions ++ defaultOptions ++ (
          if (useAggressiveScalacOptions) {
            defaultOptionsBefore2_13 ++ aggressiveScalacOptions2_12
          } else {
            defaultOptionsBefore2_13 ++ scalacOptions2_12
          }
        )

      case (SemVer.Major(2), SemVer.Minor(13), SemVer.Patch(patch)) if patch >= 3 =>
        essentialOptions ++ defaultOptions ++ (
          if (useAggressiveScalacOptions) {
            defaultOptions2_13_3_and_higher ++ aggressiveScalacOptions2_13
          } else {
            defaultOptions2_13_3_and_higher ++ scalacOptions2_13
          }
        )

      case (SemVer.Major(2), SemVer.Minor(13), _) =>
        essentialOptions ++ defaultOptions ++ (
          if (useAggressiveScalacOptions) {
            defaultOptions2_13 ++ aggressiveScalacOptions2_13
          } else {
            defaultOptions2_13 ++ scalacOptions2_13
          }
        )

      case (SemVer.Major(3), SemVer.Minor(0), _) =>
        scala3Options

      case _ =>
        Seq.empty[String]
    }

  override lazy val projectSettings: Seq[Setting[_]] = Seq(
      useAggressiveScalacOptions := false
    , scalacOptions := (
        crossVersionProps(
          scalacOptions.value
        , SemVer.parseUnsafe(scalaVersion.value)
        )(versionSpecificScalacOptions(useAggressiveScalacOptions.value))
      ).distinct
    , Compile / console / scalacOptions := essentialOptions.distinct
    , updateOptions := updateOptions.value.withCircularDependencyLevel(CircularDependencyLevel.Error)
    , libraryDependencies ++=
      (SemVer.parse(scalaVersion.value) match {
        case Right(SemVer(SemVer.Major(2), SemVer.Minor(10), SemVer.Patch(7), _, _)) =>
          Seq("com.milessabin" % "si2712fix-plugin_2.10.7" % "1.2.0" % "plugin->default(compile)")
        case Right(_: SemVer) =>
          Seq.empty[ModuleID]
        case Left(error) =>
          sLog.value.warn(
            "Parsing scalaVersion failed when setting up partial-unification\n" +
            s"Parse failure info: ${ParseError.render(error)}"
          )
          Seq.empty[ModuleID]
      })
  )

  // $COVERAGE-ON$
}
