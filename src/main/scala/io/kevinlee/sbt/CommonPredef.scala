package io.kevinlee.sbt

/**
  * @author Kevin Lee
  * @since 2018-10-21
  */
object CommonPredef {
  @SuppressWarnings(Array("org.wartremover.warts.Equals"))
  implicit final class AnyEquals[A](val self: A) extends AnyVal {
    def ===(other: A): Boolean = self == other
    def !==(other: A): Boolean = self != other
  }
}
