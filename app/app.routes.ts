import { Routes } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { UserComponent } from "./user/user.component";
import { RegisterComponent } from "./register/register.component";
import { ProfileComponent } from "./profile/profile.component";
import { QuizComponent } from "./quiz/quiz.component";
import { AdminPanelComponent } from "./admin-panel/admin-panel.component";
import { RankTopComponent } from "./rank-top/rank-top.component";
import { FindMatchComponent } from "./find-match/find-match.component";
import { ChatComponent } from "./chat/chat.component";

import { UserResolver } from "./user/user.resolver";
import { AuthGuard } from "./core/auth.guard";

export const rootRouterConfig: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent, canActivate: [AuthGuard] },
  { path: "profile", component: ProfileComponent },
  { path: "find-match", component: FindMatchComponent },
  { path: "panel", component: AdminPanelComponent },
  { path: "train", component: QuizComponent },
  { path: "rank", component: RankTopComponent },
  { path: "chat", component: ChatComponent },
  { path: "register", component: RegisterComponent, canActivate: [AuthGuard] },
  { path: "user", component: UserComponent }
];
