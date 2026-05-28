package com.menttis.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Menu
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import kotlinx.coroutines.launch
import com.menttis.app.ui.theme.*

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MenuScreen(
    onLogout: () -> Unit,
    onNavigateToJoinGroup: () -> Unit,
    onNavigateToCreateGroup: () -> Unit,
    onNavigateToConfig: () -> Unit,
    onNavigateToHelp: () -> Unit
) {
    val drawerState = rememberDrawerState(initialValue = DrawerValue.Closed)
    val scope = rememberCoroutineScope()

    ModalNavigationDrawer(
        drawerState = drawerState,
        drawerContent = {
            ModalDrawerSheet(
                drawerContainerColor = DarkBlue,
                drawerContentColor = Color.White
            ) {
                Spacer(Modifier.height(24.dp))
                Text(
                    text = "Menttis",
                    fontSize = 24.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color.White,
                    modifier = Modifier.padding(16.dp)
                )
                HorizontalDivider(color = Color.White.copy(alpha = 0.3f))
                
                DrawerItem("Juntar ao grupo") { 
                    scope.launch { drawerState.close() }
                    onNavigateToJoinGroup() 
                }
                DrawerItem("Criar grupo") { 
                    scope.launch { drawerState.close() }
                    onNavigateToCreateGroup() 
                }
                DrawerItem("Configurações") { 
                    scope.launch { drawerState.close() }
                    onNavigateToConfig() 
                }
                DrawerItem("Ajuda & feedback") { 
                    scope.launch { drawerState.close() }
                    onNavigateToHelp() 
                }
                DrawerItem("Início") { scope.launch { drawerState.close() } }
                
                Spacer(modifier = Modifier.weight(1f))
                
                Button(
                    onClick = { onLogout() },
                    colors = ButtonDefaults.buttonColors(containerColor = Color.Transparent, contentColor = Color.White),
                    modifier = Modifier.padding(16.dp).fillMaxWidth()
                ) {
                    Text("Sair", fontWeight = FontWeight.Bold)
                }
            }
        }
    ) {
        Scaffold(
            topBar = {
                TopAppBar(
                    title = { Text("Menttis", color = DarkBlue, fontWeight = FontWeight.Bold) },
                    navigationIcon = {
                        IconButton(onClick = { scope.launch { drawerState.open() } }) {
                            Icon(Icons.Filled.Menu, contentDescription = "Menu", tint = DarkBlue)
                        }
                    },
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
                    text = "Bem-vindo ao Menttis!",
                    fontSize = 24.sp,
                    fontWeight = FontWeight.Bold,
                    color = DarkBlue
                )
                Spacer(modifier = Modifier.height(16.dp))
                
                Card(
                    colors = CardDefaults.cardColors(containerColor = White),
                    modifier = Modifier.fillMaxWidth().height(150.dp),
                    elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
                ) {
                    Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                        Text("Área de Conteúdo (Cronômetro / Grupos)", color = DarkText)
                    }
                }
            }
        }
    }
}

@Composable
fun DrawerItem(text: String, onClick: () -> Unit) {
    Text(
        text = text,
        fontSize = 18.sp,
        fontWeight = FontWeight.Medium,
        color = Color.White,
        modifier = Modifier
            .fillMaxWidth()
            .clickable { onClick() }
            .padding(16.dp)
    )
}

@Preview(showBackground = true)
@Composable
fun MenuScreenPreview() {
    MenttisTheme {
        MenuScreen(
            onLogout = {},
            onNavigateToJoinGroup = {},
            onNavigateToCreateGroup = {},
            onNavigateToConfig = {},
            onNavigateToHelp = {}
        )
    }
}
