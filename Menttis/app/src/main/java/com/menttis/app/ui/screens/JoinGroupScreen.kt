package com.menttis.app.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.menttis.app.ui.theme.*

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun JoinGroupScreen(onBack: () -> Unit) {
    var groupCode by remember { mutableStateOf("") }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Juntar ao Grupo", color = DarkBlue, fontWeight = FontWeight.Bold) },
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
        ) {
            Text(
                text = "Junte-se a um grupo!",
                fontSize = 28.sp,
                fontWeight = FontWeight.Bold,
                color = DarkBlue
            )
            Spacer(modifier = Modifier.height(16.dp))

            Text(
                text = "Insira o código do grupo que o administrador compartilhou com você.",
                fontSize = 16.sp,
                color = DarkText
            )
            Spacer(modifier = Modifier.height(24.dp))

            OutlinedTextField(
                value = groupCode,
                onValueChange = { groupCode = it },
                placeholder = { Text("Cole o link ou código do grupo") },
                modifier = Modifier.fillMaxWidth(),
                singleLine = true,
                colors = OutlinedTextFieldDefaults.colors(
                    focusedBorderColor = DarkBlue,
                    unfocusedBorderColor = DarkText
                )
            )

            Spacer(modifier = Modifier.height(32.dp))

            Button(
                onClick = { /* Lógica de entrar no grupo */ },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(50.dp),
                colors = ButtonDefaults.buttonColors(containerColor = DarkBlue, contentColor = YellowAccent),
                shape = RoundedCornerShape(10.dp)
            ) {
                Text("Entrar", fontSize = 18.sp, fontWeight = FontWeight.Bold)
            }

            Spacer(modifier = Modifier.height(24.dp))
            
            Text(
                text = "Dica: Você precisa da aprovação do líder para acessar o conteúdo do grupo.",
                fontSize = 14.sp,
                color = Color.Gray
            )
        }
    }
}

@Preview(showBackground = true)
@Composable
fun JoinGroupScreenPreview() {
    MenttisTheme {
        JoinGroupScreen(onBack = {})
    }
}
