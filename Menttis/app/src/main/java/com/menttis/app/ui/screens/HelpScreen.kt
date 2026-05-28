package com.menttis.app.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.menttis.app.ui.theme.*

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HelpScreen() {
    var feedback by remember { mutableStateOf("") }
    val scrollState = rememberScrollState()

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Ajuda & Feedback", color = DarkBlue, fontWeight = FontWeight.Bold) },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = White)
            )
        },
        containerColor = LightBackground
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .padding(innerPadding)
                .fillMaxSize()
                .padding(24.dp)
                .verticalScroll(scrollState)
        ) {
            Text("Perguntas frequentes:", fontSize = 22.sp, fontWeight = FontWeight.Bold, color = DarkBlue)
            Spacer(modifier = Modifier.height(16.dp))

            FaqItem("Como o XP é calculado?", "O XP é ganho com base no tempo que você passa estudando enquanto está com o cronômetro ativo.")
            FaqItem("Como funcionam os grupos?", "Você pode criar um grupo com seus amigos ou entrar em um já existente. Competindo de forma saudável para ver quem estuda mais.")
            FaqItem("Detecção de inatividade", "A cada dez minutos, o site envia uma pergunta sobre o conteúdo que você está estudando.")

            Spacer(modifier = Modifier.height(32.dp))
            HorizontalDivider(color = DarkBlue.copy(alpha = 0.2f))
            Spacer(modifier = Modifier.height(24.dp))

            Text("Deixe seu Feedback!", fontSize = 20.sp, fontWeight = FontWeight.Bold, color = DarkBlue)
            Spacer(modifier = Modifier.height(16.dp))

            OutlinedTextField(
                value = feedback,
                onValueChange = { feedback = it },
                placeholder = { Text("Tem alguma ideia ou sugestão? Conta pra gente!") },
                modifier = Modifier.fillMaxWidth().height(150.dp),
                colors = OutlinedTextFieldDefaults.colors(focusedBorderColor = DarkBlue)
            )

            Spacer(modifier = Modifier.height(16.dp))

            Button(
                onClick = { /* Enviar feedback */ },
                modifier = Modifier.fillMaxWidth().height(50.dp),
                colors = ButtonDefaults.buttonColors(containerColor = DarkBlue, contentColor = White),
                shape = RoundedCornerShape(10.dp)
            ) {
                Text("Enviar Feedback", fontSize = 16.sp, fontWeight = FontWeight.Bold)
            }
        }
    }
}

@Composable
fun FaqItem(question: String, answer: String) {
    Column(modifier = Modifier.padding(bottom = 16.dp)) {
        Text(question, fontSize = 18.sp, fontWeight = FontWeight.SemiBold, color = DarkText)
        Spacer(modifier = Modifier.height(4.dp))
        Text(answer, fontSize = 15.sp, color = DarkText)
    }
}

@Preview(showBackground = true)
@Composable
fun HelpScreenPreview() {
    MenttisTheme {
        HelpScreen()
    }
}
