package com.menttis.app.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

val DarkBlue = Color(0xFF2B4D9C)
val YellowAccent = Color(0xFFF5C22C)
val LightBackground = Color(0xFFFAF4E8)
val DarkText = Color(0xFF333333)
val White = Color(0xFFFFFFFF)
val ButtonHover = Color(0xFF23417C)
val ErrorRed = Color(0xFFD60000)
val SuccessGreen = Color(0xFF008000)

private val MenttisColorScheme = lightColorScheme(
    primary = DarkBlue,
    secondary = YellowAccent,
    background = LightBackground,
    surface = White,
    onPrimary = White,
    onSecondary = DarkBlue,
    onBackground = DarkText,
    onSurface = DarkText
)

@Composable
fun MenttisTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = MenttisColorScheme,
        content = content
    )
}
