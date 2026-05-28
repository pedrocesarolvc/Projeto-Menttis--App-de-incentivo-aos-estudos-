package com.menttis.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.runtime.Composable
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.menttis.app.ui.screens.*
import com.menttis.app.ui.theme.MenttisTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MenttisTheme {
                // Chama a função principal de navegação
                MenttisAppNavigation()
            }
        }
    }
}

@Composable
fun MenttisAppNavigation() {
    // O NavController é o "motorista" do aplicativo, ele sabe para onde ir
    val navController = rememberNavController()

    // O NavHost é o "mapa" que liga os nomes ("login", "menu") com as telas de fato
    NavHost(navController = navController, startDestination = "login") {
        
        // Tela 1: Login
        composable("login") {
            LoginScreen(
                onNavigateToMenu = { navController.navigate("menu") },
                onNavigateToCreateAccount = { navController.navigate("createAccount") }
            )
        }

        // Tela 2: Criar Conta
        composable("createAccount") {
            CreateAccountScreen(
                onNavigateToLogin = { navController.navigate("login") }
            )
        }

        // Tela 3: Menu Principal (Com Menu Lateral)
        composable("menu") {
            MenuScreen(
                onLogout = { 
                    // Volta pro login e limpa o histórico pra não voltar pro menu clicando em "Voltar"
                    navController.navigate("login") {
                        popUpTo(0)
                    } 
                },
                onNavigateToJoinGroup = { navController.navigate("joinGroup") },
                onNavigateToCreateGroup = { navController.navigate("createGroup") },
                onNavigateToConfig = { navController.navigate("config") },
                onNavigateToHelp = { navController.navigate("help") }
            )
        }

        // Tela 4: Juntar ao Grupo
        composable("joinGroup") {
            JoinGroupScreen(onBack = { navController.popBackStack() })
        }

        // Tela 5: Criar Grupo
        composable("createGroup") {
            CreateGroupScreen(onBack = { navController.popBackStack() })
        }

        // Tela 6: Configurações
        composable("config") {
            ConfigScreen(onBack = { navController.popBackStack() })
        }

        // Tela 7: Ajuda e Feedback
        composable("help") {
            HelpScreen()
        }
    }
}
