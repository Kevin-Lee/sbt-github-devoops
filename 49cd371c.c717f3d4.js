(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{142:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return c})),a.d(t,"metadata",(function(){return o})),a.d(t,"rightToc",(function(){return l})),a.d(t,"default",(function(){return b}));var n=a(2),s=a(10),i=(a(0),a(159)),c={id:"config-and-run",title:"DevOopsGitReleasePlugin - Config and Run",sidebar_label:"Config and Run"},o={id:"gh-release-plugin/config-and-run",isDocsHomePage:!1,title:"DevOopsGitReleasePlugin - Config and Run",description:"Enable DevOopsGitReleasePlugin",source:"@site/docs/gh-release-plugin/config-and-run.md",permalink:"/docs/gh-release-plugin/config-and-run",sidebar_label:"Config and Run",sidebar:"someSidebar",previous:{title:"Getting Started",permalink:"/docs/"},next:{title:"DevOopsGitReleasePlugin Examples",permalink:"/docs/gh-release-plugin/examples"}},l=[{value:"Enable DevOopsGitReleasePlugin",id:"enable-devoopsgitreleaseplugin",children:[]},{value:"Tag",id:"tag",children:[{value:"<code>gitTagFrom</code>",id:"gittagfrom",children:[]},{value:"<code>gitTagDescription</code> (Optional)",id:"gittagdescription-optional",children:[]},{value:"<code>gitTagName</code>",id:"gittagname",children:[]},{value:"<code>gitTagPushRepo</code>",id:"gittagpushrepo",children:[]},{value:"<code>gitTag</code>",id:"gittag",children:[]}]},{value:"Artifacts",id:"artifacts",children:[{value:"<code>devOopsCiDir</code>",id:"devoopscidir",children:[]},{value:"<code>devOopsPackagedArtifacts</code>",id:"devoopspackagedartifacts",children:[]},{value:"<code>devOopsCopyReleasePackages</code>",id:"devoopscopyreleasepackages",children:[]}]},{value:"Changelog",id:"changelog",children:[{value:"<code>changelogLocation</code>",id:"changeloglocation",children:[]}]},{value:"GitHub Release",id:"github-release",children:[{value:"<code>gitHubAuthTokenEnvVar</code>",id:"githubauthtokenenvvar",children:[]},{value:"<code>gitHubAuthTokenFile</code>",id:"githubauthtokenfile",children:[]},{value:"<code>artifactsRequiredForGitHubRelease</code>",id:"artifactsrequiredforgithubrelease",children:[]},{value:"<code>gitHubRelease</code>",id:"githubrelease",children:[]},{value:"<code>gitTagAndGitHubRelease</code>",id:"gittagandgithubrelease",children:[]}]}],r={rightToc:l};function b(e){var t=e.components,a=Object(s.a)(e,["components"]);return Object(i.b)("wrapper",Object(n.a)({},r,a,{components:t,mdxType:"MDXLayout"}),Object(i.b)("h2",{id:"enable-devoopsgitreleaseplugin"},"Enable DevOopsGitReleasePlugin"),Object(i.b)("p",null,"To use ",Object(i.b)("inlineCode",{parentName:"p"},"DevOopsGitReleasePlugin"),", add the following line to ",Object(i.b)("inlineCode",{parentName:"p"},"build.sbt"),"."),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{className:"language-sbt"}),"enablePlugins(DevOopsGitReleasePlugin)\n")),Object(i.b)("p",null,"e.g.) This is an example of the minimal settings."),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{className:"language-scala"}),'ThisBuild / organization := "com.example"\nThisBuild / scalaVersion := "2.12.7"\nThisBuild / version := "0.1.0"\nThisBuild / crossScalaVersions := Seq("2.11.12", "2.12.8")\n\nlazy val root = (project in file("."))\n  .enablePlugins(DevOopsGitReleasePlugin)\n  .settings(\n    name := "test-project",\n    libraryDependencies += "some" %% "lib" % "1.0.0"\n  )\n')),Object(i.b)("h2",{id:"tag"},"Tag"),Object(i.b)("h3",{id:"gittagfrom"},Object(i.b)("inlineCode",{parentName:"h3"},"gitTagFrom")),Object(i.b)("p",null,"The name of the branch from which it tags. So if the current branch is not the same as the ",Object(i.b)("inlineCode",{parentName:"p"},"gitTagFrom")," value, ",Object(i.b)("inlineCode",{parentName:"p"},"gitTag")," does not tag but throws an exception. "),Object(i.b)("p",null,"Default: "),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{className:"language-scala"}),'gitTagFrom := "master"\n')),Object(i.b)("h3",{id:"gittagdescription-optional"},Object(i.b)("inlineCode",{parentName:"h3"},"gitTagDescription")," (Optional)"),Object(i.b)("p",null,Object(i.b)("inlineCode",{parentName:"p"},"gitTagDescription")," is the setting to specify the tag description. If not set, it tags without any tag description."),Object(i.b)("p",null,"Default:"),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{className:"language-scala"}),"gitTagDescription := None\n")),Object(i.b)("p",null,"Wihtout the description, it's equivalent to "),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{className:"language-bash"}),"git tag ${gitTagFrom.value}\n")),Object(i.b)("p",null,"With the description, it's equivalent to "),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{className:"language-bash"}),"git tag -a ${gitTagFrom.value}, -m ${gitTagDescription.value}\n")),Object(i.b)("h3",{id:"gittagname"},Object(i.b)("inlineCode",{parentName:"h3"},"gitTagName")),Object(i.b)("p",null,"This setting decides how to name the tag. It uses the project's version (i.e. ",Object(i.b)("inlineCode",{parentName:"p"},"version.value"),") with the suffix 'v'"),Object(i.b)("p",null,"e.g.) If ",Object(i.b)("inlineCode",{parentName:"p"},'version := "1.0.0"'),", the tag name is ",Object(i.b)("inlineCode",{parentName:"p"},"v1.0.0"),"."),Object(i.b)("p",null,"Default:"),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{className:"language-scala"}),'import just.semver.SemVer\n// ...\ngitTagName := s"v${SemVer.render(SemVer.parseUnsafe(version.value))}"\n')),Object(i.b)("h3",{id:"gittagpushrepo"},Object(i.b)("inlineCode",{parentName:"h3"},"gitTagPushRepo")),Object(i.b)("p",null,"This tells which remote repository to push. It's usually ",Object(i.b)("inlineCode",{parentName:"p"},"origin"),". If there are multiple repositories, you can change it to the one you want."),Object(i.b)("p",null,"e.g.)"),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{className:"language-scala"}),'gitTagPushRepo := "github"\n')),Object(i.b)("p",null,"Default:"),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{className:"language-scala"}),'gitTagPushRepo := "origin"\n')),Object(i.b)("h3",{id:"gittag"},Object(i.b)("inlineCode",{parentName:"h3"},"gitTag")),Object(i.b)("p",null,"It is an sbt task to create a git tag from the branch set in ",Object(i.b)("inlineCode",{parentName:"p"},"gitTagFrom"),". It may fail if the project version is no GA."),Object(i.b)("p",null,"e.g.) "),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"Success Case")),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{className:"language-sbtshell"}),"sbt:test-project> gitTag\ntask success>\n>> non sbt task success> The semantic version from the project version has been parsed. version: 0.1.0\n>> git rev-parse --abbrev-ref HEAD => master\n>> git fetch --tags\n>> git tag v0.1.0\n>> git push origin v0.1.0\n  |  To github.com:Kevin-Lee/test-project.git\n  |   * [new tag]         v0.1.0 -> v0.1.0\n\n[success] Total time: 7 s, completed 16 Oct. 2019, 5:19:31 pm\n")),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"Failure Case")),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{className:"language-sbtshell"}),"sbt:test-project> gitTag\nFailure]\n>> sbt task failed after finishing the following tasks\ntask success>\n>> non sbt task success> The semantic version from the project version has been parsed. version: 0.1.0-SNAPSHOT\n\n  This version is not eligible for tagging. [version: 0.1.0-SNAPSHOT]\n  It should be GA version with any pre-release or meta-info suffix\n    e.g.)\n    * 1.0.0 (\u2b55\ufe0f)\n    * 1.0.0-SNAPSHOT (\u274c)\n    * 1.0.0-beta (\u274c)\n    * 1.0.0+123 (\u274c)\n    * 1.0.0-beta+123 (\u274c)\n\n")),Object(i.b)("p",null,"or"),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{className:"language-sbtshell"}),"sbt:test-project> gitTag\nFailure]\n>> sbt task failed after finishing the following tasks\ntask success>\n>> non sbt task success> The semantic version from the project version has been parsed. version: 0.1.0\n>> git rev-parse --abbrev-ref HEAD => master\n>> git fetch --tags\n  | => root / gitTag 2s\n>> [cmd: git tag v0.1.0], [code: 128], [errors: fatal: tag 'v0.1.0' already exists]\n\n")),Object(i.b)("h2",{id:"artifacts"},"Artifacts"),Object(i.b)("h3",{id:"devoopscidir"},Object(i.b)("inlineCode",{parentName:"h3"},"devOopsCiDir")),Object(i.b)("p",null,Object(i.b)("inlineCode",{parentName:"p"},"devOopsCiDir")," is the ci directory which contains the files created in build to upload to GitHub release (e.g. packaged jar files) It can be either an absolute or relative path. When running ",Object(i.b)("inlineCode",{parentName:"p"},"devOopsCopyReleasePackages"),", all the jar files with prefixed with the project name (",Object(i.b)("inlineCode",{parentName:"p"},"devOopsPackagedArtifacts.value"),") are copied to ",Object(i.b)("inlineCode",{parentName:"p"},"${devOopsCiDir.value}/dist"),"."),Object(i.b)("p",null,"Default:"),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{className:"language-scala"}),'devOopsCiDir := "ci"\n// so the artifactsare copied to ci/dist\n')),Object(i.b)("h3",{id:"devoopspackagedartifacts"},Object(i.b)("inlineCode",{parentName:"h3"},"devOopsPackagedArtifacts")),Object(i.b)("p",null,"A ",Object(i.b)("inlineCode",{parentName:"p"},"List")," of packaged artifacts to be copied to ",Object(i.b)("inlineCode",{parentName:"p"},"PROJECT_HOME/${devOopsCiDir.value}/dist"),"."),Object(i.b)("p",null,"Default:"),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{className:"language-scala"}),'devOopsPackagedArtifacts := List(s"target/scala-*/${name.value}*.jar")\n')),Object(i.b)("p",null,"So for Java projects, change it to "),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{className:"language-scala"}),'devOopsPackagedArtifacts := List(s"target/${name.value}*.jar")\n')),Object(i.b)("h3",{id:"devoopscopyreleasepackages"},Object(i.b)("inlineCode",{parentName:"h3"},"devOopsCopyReleasePackages")),Object(i.b)("p",null,"It is an sbt task to copy packaged artifacts to the location specified (default: ",Object(i.b)("inlineCode",{parentName:"p"},"devOopsPackagedArtifacts.value")," to ",Object(i.b)("inlineCode",{parentName:"p"},"PROJECT_HOME/${devOopsCiDir.value}/dist"),")."),Object(i.b)("p",null,"e.g.)"),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{className:"language-sbtshell"}),"sbt:test-project> devOopsCopyReleasePackages\n>> copyPackages - Files copied from:\n  - /user/home/test-project/target/scala-2.12/test-project_2.12-0.1.0.jar\n  - /user/home/test-project/target/scala-2.12/test-project_2.12-0.1.0-sources.jar\n  - /user/home/test-project/target/scala-2.12/test-project_2.12-0.1.0-javadoc.jar\n\n  to\n  - ci/dist/test-project_2.12-0.1.0-javadoc.jar\n  - ci/dist/test-project_2.12-0.1.0-sources.jar\n  - ci/dist/test-project_2.12-0.1.0.jar\n\n\n[success] Total time: 0 s, completed 6 Apr. 2019, 11:32:21 pm\n")),Object(i.b)("h2",{id:"changelog"},"Changelog"),Object(i.b)("h3",{id:"changeloglocation"},Object(i.b)("inlineCode",{parentName:"h3"},"changelogLocation")),Object(i.b)("p",null,"The location of changelog file. The change log filename should be the project version with the extension of ",Object(i.b)("inlineCode",{parentName:"p"},".md"),"."),Object(i.b)("p",null,"e.g.) ",Object(i.b)("inlineCode",{parentName:"p"},'version.value := "1.0.0"')," then the changelog file should be ",Object(i.b)("inlineCode",{parentName:"p"},"1.0.0.md")," at the location set in ",Object(i.b)("inlineCode",{parentName:"p"},"changelogLocation"),"."),Object(i.b)("p",null,"Default:"),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{className:"language-scala"}),'changelogLocation := "changelogs"\n')),Object(i.b)("h2",{id:"github-release"},"GitHub Release"),Object(i.b)("h3",{id:"githubauthtokenenvvar"},Object(i.b)("inlineCode",{parentName:"h3"},"gitHubAuthTokenEnvVar")),Object(i.b)("p",null,"The name of environment variable to get the GitHub auth token. It is required to do GitHub release. If the envvar is not found, it will try to read the auth token file set in ",Object(i.b)("inlineCode",{parentName:"p"},"gitHubAuthTokenFile"),"."),Object(i.b)("p",null,"Default:"),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{className:"language-scala"}),'gitHubAuthTokenEnvVar := "GITHUB_TOKEN"\n')),Object(i.b)("h3",{id:"githubauthtokenfile"},Object(i.b)("inlineCode",{parentName:"h3"},"gitHubAuthTokenFile")),Object(i.b)("p",null,"The path to GitHub OAuth token file. The file should contain oauth=OAUTH_TOKEN (default: ",Object(i.b)("inlineCode",{parentName:"p"},"Some($USER/.github)"),") If you want to have a different filename in user's home, do ",Object(i.b)("inlineCode",{parentName:"p"},'Some(new File(Io.getUserHome, "your_filename"))'),"."),Object(i.b)("p",null,"Default:"),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{className:"language-scala"}),'gitHubAuthTokenFile := Some(new File(Io.getUserHome, ".github"))\n')),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"NOTE: This is optional and if there's a value for the environment variable set in ",Object(i.b)("inlineCode",{parentName:"strong"},"gitHubAuthTokenEnvVar"),", The envvar will be used instead of using the value from the auth token file. It will not even try to read the file if the envvar is set.")),Object(i.b)("h3",{id:"artifactsrequiredforgithubrelease"},Object(i.b)("inlineCode",{parentName:"h3"},"artifactsRequiredForGitHubRelease")),Object(i.b)("p",null,"A setting to decide whether to upload the packaged artifacts to GitHub when doing GitHub release."),Object(i.b)("p",null,"If it's ",Object(i.b)("inlineCode",{parentName:"p"},"false"),", no files are uploaded yet the changelog is still uploaded to GitHub."),Object(i.b)("p",null,"Default:"),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{className:"language-sbt"}),"artifactsRequiredForGitHubRelease := true\n")),Object(i.b)("h3",{id:"githubrelease"},Object(i.b)("inlineCode",{parentName:"h3"},"gitHubRelease")),Object(i.b)("p",null,"Is it an sbt task to release the current version by uploading the packaged files and changelog to GitHub.\nIt does"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"Copy packaged files (",Object(i.b)("inlineCode",{parentName:"li"},"devOopsCopyReleasePackages"),")"),Object(i.b)("li",{parentName:"ul"},"Upload the packaged files (if ",Object(i.b)("inlineCode",{parentName:"li"},"artifactsRequiredForGitHubRelease")," is ",Object(i.b)("inlineCode",{parentName:"li"},"true"),") and changelog to GitHub.")),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"NOTE: It does not create any tag and if the tag with the project version (e.g. version: 1.0.0 => tag: v1.0.0) does not exist, ",Object(i.b)("inlineCode",{parentName:"strong"},"gitHubRelease")," fails")),Object(i.b)("p",null,"e.g.) ",Object(i.b)("inlineCode",{parentName:"p"},"gitHubRelease")," with uploading artifacts (",Object(i.b)("inlineCode",{parentName:"p"},"artifactsRequiredForGitHubRelease := true"),")"),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{className:"language-sbtshell"}),"sbt:test-project> gitHubRelease\n>> copyPackages - Files copied from:\n  - /user/home/test-project/target/scala-2.13/test-project_2.13-0.1.0.jar\n  - /user/home/test-project/target/scala-2.13/test-project_2.13-0.1.0-sources.jar\n  - /user/home/test-project/target/scala-2.13/test-project_2.13-0.1.0-javadoc.jar\n\n  to\n  - ci/dist/test-project_2.13-0.1.0-javadoc.jar\n  - ci/dist/test-project_2.13-0.1.0-sources.jar\n  - ci/dist/test-project_2.13-0.1.0.jar\n\n\ntask success>\n>> git fetch --tags\n>> git tag\n  |  v0.1.0\n  |  v0.1.0-SNAPSHOT\n>> task success>\n>> Get GitHub OAuth tokense 7s\n\n>> task success>\n>> Get changelog\n\n>> task success>\n>> git remote get-url origin => git@github.com:Kevin-Lee/test-project.git\n\n>> task success>\n>> Get GitHub repo org and name: Kevin-Lee/test-project\n\n>> task success>\n>> Connect GitHub with OAuth\n\n>> task success>\n>> GitHub release: v0.1.0\n\n>> task success>\n>> Files uploaded:\n    - ci/dist/test-project_2.13-0.1.0-javadoc.jar\n    - ci/dist/test-project_2.13-0.1.0-sources.jar\n    - ci/dist/test-project_2.13-0.1.0.jar\n\n>> task success>\n>> Changelog uploaded:\n    # 0.1.0 - 2019-10-16\n\n    Test Release\n\n[success] Total time: 8 s, completed 16 Oct. 2019, 5:23:06 pm\n")),Object(i.b)("p",null,"e.g.) ",Object(i.b)("inlineCode",{parentName:"p"},"gitHubRelease")," without uploading artifacts (",Object(i.b)("inlineCode",{parentName:"p"},"artifactsRequiredForGitHubRelease := false"),")"),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{className:"language-sbtshell"}),"```sbtshell\nsbt:test-project> gitHubRelease\n>> copyPackages - Files copied from:\n  -\n\n  to\n  -\n  | => root / devOopsPackagedArtifacts 0s\n\ntask success>\n>> git fetch --tags\n>> git tag\n  |  v0.1.0\n  |  v0.1.0-SNAPSHOT\n>> task success>tHubRelease 4s\n>> Get GitHub OAuth token\n\n>> task success>\n>> Get changelog\n\n>> task success>\n>> git remote get-url origin => git@github.com:Kevin-Lee/test-project.git\n\n>> task success>\n>> Get GitHub repo org and name: Kevin-Lee/test-project\n\n>> task success>\n>> Connect GitHub with OAuth\n\n>> task success>\n>> GitHub release: v0.1.0\n\n>> task success>\n>> No files to upload\n\n>> task success>\n>> Changelog uploaded:\n    # 0.1.0 - 2019-10-16\n\n    Test Release\n\n[success] Total time: 5 s, completed 16 Oct. 2019, 5:09:42 pm\n")),Object(i.b)("p",null,"e.g.) When there's no tag with the current version."),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{className:"language-sbtshell"}),">> copyPackages - Files copied from:\n  - /user/home/test-project/target/scala-2.13/test-project_2.13-0.1.0.jar\n  - /user/home/test-project/target/scala-2.13/test-project_2.13-0.1.0-sources.jar\n  - /user/home/test-project/target/scala-2.13/test-project_2.13-0.1.0-javadoc.jar\n\n  to=> root / gitTagPushRepo 0s\n  - ci/dist/test-project_2.13-0.1.0-javadoc.jar\n  - ci/dist/test-project_2.13-0.1.0-sources.jar\n  - ci/dist/test-project_2.13-0.1.0.jar\n\n\nFailure]\n>> sbt task failed after finishing the following tasks\ntask success>\n>> git fetch --tags\n>> git tag => v0.1.0-SNAPSHOT\n  | => root / gitHubRelease 2s\ntask failed> git command: tag v0.1.0 does not exist. tags: [v0.1.0-SNAPSHOT]\n\n[error] task failed> git command: tag v0.1.0 does not exist. tags: [v0.1.0-SNAPSHOT]\n[error] (gitHubRelease) task failed> git command: tag v0.1.0 does not exist. tags: [v0.1.0-SNAPSHOT]\n[error] Total time: 2 s, completed 16 Oct. 2019, 5:18:05 pm\n")),Object(i.b)("h3",{id:"gittagandgithubrelease"},Object(i.b)("inlineCode",{parentName:"h3"},"gitTagAndGitHubRelease")),Object(i.b)("p",null,"Is it an sbt task to release the current version by uploading the packaged files and changelog to GitHub after git tagging.\nIt does"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"Copy packaged files (",Object(i.b)("inlineCode",{parentName:"li"},"devOopsCopyReleasePackages"),")"),Object(i.b)("li",{parentName:"ul"},"Git tag with the current version (",Object(i.b)("inlineCode",{parentName:"li"},"gitTag"),")"),Object(i.b)("li",{parentName:"ul"},"Upload the packaged files (if ",Object(i.b)("inlineCode",{parentName:"li"},"artifactsRequiredForGitHubRelease")," is ",Object(i.b)("inlineCode",{parentName:"li"},"true"),") and changelog to GitHub.")),Object(i.b)("p",null,"e.g.) ",Object(i.b)("inlineCode",{parentName:"p"},"gitTagAndGitHubRelease")," with uploading artifacts (",Object(i.b)("inlineCode",{parentName:"p"},"artifactsRequiredForGitHubRelease := true"),")"),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{className:"language-sbtshell"}),"sbt:test-project> gitTagAndGitHubRelease\n>> copyPackages - Files copied from:\n  - /user/home/test-project/target/scala-2.13/test-project_2.13-0.1.0.jar\n  - /user/home/test-project/target/scala-2.13/test-project_2.13-0.1.0-sources.jar\n  - /user/home/test-project/target/scala-2.13/test-project_2.13-0.1.0-javadoc.jar\n\n  to=> root / devOopsPackagedArtifacts 0s\n  - ci/dist/test-project_2.13-0.1.0-javadoc.jar\n  - ci/dist/test-project_2.13-0.1.0-sources.jar\n  - ci/dist/test-project_2.13-0.1.0.jar\n\n\ntask success>\n>> task success>\n>> Get GitHub OAuth token\n\n>> non sbt task success> The semantic version from the project version has been parsed. version: 0.1.0\n>> git rev-parse --abbrev-ref HEAD => master\n>> git fetch --tags\n>> git tag v0.1.0\n>> git push origin v0.1.0\n  |  To github.com:Kevin-Lee/test-project.git\n  |   * [new tag]         v0.1.0 -> v0.1.0\n>> task success>\n>> Get changelog\n\n>> task success>\n>> git remote get-url origin => git@github.com:Kevin-Lee/test-project.git\n\n>> task success>\n>> Get GitHub repo org and name: Kevin-Lee/test-project\n\n>> task success>\n>> Connect GitHub with OAuth\n\n>> task success>\n>> GitHub release: v0.1.0\n\n>> task success>\n>> Files uploaded:\n    - ci/dist/test-project_2.13-0.1.0-javadoc.jar\n    - ci/dist/test-project_2.13-0.1.0-sources.jar\n    - ci/dist/test-project_2.13-0.1.0.jar\n\n>> task success>\n>> Changelog uploaded:\n    # 0.1.0 - 2019-10-16\n\n    Test Release\n\n[success] Total time: 12 s, completed 16 Oct. 2019, 5:28:00 pm\n")),Object(i.b)("p",null,"e.g.) ",Object(i.b)("inlineCode",{parentName:"p"},"gitTagAndGitHubRelease")," without uploading artifacts (",Object(i.b)("inlineCode",{parentName:"p"},"artifactsRequiredForGitHubRelease := false"),")"),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{className:"language-sbtshell"}),"sbt:test-project> gitTagAndGitHubRelease\n>> copyPackages - Files copied from:\n  -\n\n  to\n  -\n  | => root / gitTagName 0s\n  | => root / devOopsPackagedArtifacts 0s\ntask success>\n>> non sbt task success> The semantic version from the project version has been parsed. version: 0.1.0\n>> git rev-parse --abbrev-ref HEAD => master\n>> git fetch --tags\n>> git tag v0.1.0\n>> git push origin v0.1.0\n  |  To github.com:Kevin-Lee/test-project.git\n  |   * [new tag]         v0.1.0 -> v0.1.0\n\ntask success>\n>> task success>\n>> Get GitHub OAuth token\n\n>> task success>\n>> Get changelog\n  | => root / gitTagAndGitHubRelease 2s\n>> task success>\n>> git remote get-url origin => git@github.com:Kevin-Lee/test-project.git\n\n>> task success>\n>> Get GitHub repo org and name: Kevin-Lee/test-project\n\n>> task success>\n>> Connect GitHub with OAuth\n\n>> task success>\n>> GitHub release: v0.1.0\n\n>> task success>\n>> No files to upload\n\n>> task success>\n>> Changelog uploaded:\n    # 0.1.0 - 2019-10-16\n\n    Test Release\n\n[success] Total time: 10 s, completed 16 Oct. 2019, 1:18:15 pm\n")))}b.isMDXComponent=!0}}]);