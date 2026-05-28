package com.menttis.app.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.runtime.getValue
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.menttis.app.ui.theme.*

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CreateGroupScreen(onBack: () -> Unit) {
    var groupName by remember { mutableStateOf("") }
    var groupDescription by remember { mutableStateOf("") }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Criar Grupo", color = DarkBlue, fontWeight = FontWeight.Bold) },
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
                text = "Crie seu Grupo!",
                fontSize = 28.sp,
                fontWeight = FontWeight.Bold,
                color = DarkBlue
            )
            Spacer(modifier = Modifier.height(24.dp))

            Text("📌 Escolha um nome para o grupo.", fontWeight = FontWeight.Medium, color = DarkText)
            Spacer(modifier = Modifier.height(8.dp))
            OutlinedTextField(
                value = groupName,
                onValueChange = { groupName = it },
                placeholder = { Text("Ex: Matemática Enem, Coders...") },
                modifier = Modifier.fillMaxWidth(),
                singleLine = true,
                colors = OutlinedTextFieldDefaults.colors(
                    focusedBorderColor = DarkBlue,
                    unfocusedBorderColor = DarkText
                )
            )

            Spacer(modifier = Modifier.height(24.dp))

            Text("✏️ Crie uma descrição.", fontWeight = FontWeight.Medium, color = DarkText)
            Spacer(modifier = Modifier.height(8.dp))
            OutlinedTextField(
                value = groupDescription,
                onValueChange = { groupDescription = it },
                placeholder = { Text("Descreva o foco do grupo (opcional)") },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(120.dp),
                colors = OutlinedTextFieldDefaults.colors(
                    focusedBorderColor = DarkBlue,
                    unfocusedBorderColor = DarkText
                )
            )

            Spacer(modifier = Modifier.height(32.dp))

            Button(
                onClick = { /* Lógica de criação */ },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(50.dp),
                colors = ButtonDefaults.buttonColors(containerColor = DarkBlue, contentColor = YellowAccent),
                shape = RoundedCornerShape(10.dp)
            ) {
                Text("Criar Grupo", fontSize = 18.sp, fontWeight = FontWeight.Bold)
            }

            Spacer(modifier = Modifier.height(16.dp))

            Text(
                text = "🌟 Seu grupo ficará visível para outros estudantes",
                fontSize = 14.sp,
                color = DarkText,
                modifier = Modifier.fillMaxWidth()
            )
        }
    }
}

@Preview(showBackground = true)
@Composable
fun CreateGroupScreenPreview() {
    MenttisTheme {
        CreateGroupScreen(onBack = {})
    }
}
