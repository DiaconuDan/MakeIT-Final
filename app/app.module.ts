import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// Additional Modules
import { ToastrModule } from "ngx-toastr";
import { CarouselModule } from "angular2-carousel";
import { BsModalModule } from "ng2-bs3-modal";
import { NgxSpinnerModule } from "ngx-spinner";
import { CountDown } from "ng2-date-countdown";
import { MomentModule } from "ngx-moment";
import { ChartsModule } from "ng2-charts";
import { SimpleTimer } from "ng2-simple-timer";
import { ToastModule } from "ng2-toastr/ng2-toastr";
import { ScrollbarModule } from "ngx-scrollbar";

// Config Files
import { environment } from "../environments/environment";

// Firebase Modules
import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireDatabaseModule } from "angularfire2/database";

// Components
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { UserComponent } from "./user/user.component";
import { RegisterComponent } from "./register/register.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { ProfileComponent } from "./profile/profile.component";
import { QuizComponent } from "./quiz/quiz.component";
import { AdminPanelComponent } from "./admin-panel/admin-panel.component";
import { RankTopComponent } from "./rank-top/rank-top.component";
import { AddQuestionModalComponent } from "./admin-panel/add-question-modal/add-question-modal.component";
// import { EditQuestionModalComponent } from "./admin-panel/edit-question-modal/edit-question-modal.component";
import { FindMatchComponent } from "./find-match/find-match.component";
import { ChatComponent } from "./chat/chat.component";
import { PlayTurboGameComponent } from "./find-match/play-turbo-game/play-turbo-game.component";

//Services
import { UserResolver } from "./user/user.resolver";
import { AuthGuard } from "./core/auth.guard";
import { AuthService } from "./core/auth.service";
import { UserService } from "./core/user.service";
import { QuestionsService } from "./core/questions.service";
import { ChatService } from "./core/chat.service";

// RouterConfig
import { rootRouterConfig } from "./app.routes";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    RegisterComponent,
    NavbarComponent,
    ProfileComponent,
    QuizComponent,
    AdminPanelComponent,
    RankTopComponent,
    AddQuestionModalComponent,
    CountDown,
    FindMatchComponent,
    ChatComponent,
    PlayTurboGameComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
    AngularFireModule.initializeApp(environment.firebase),
    ToastrModule.forRoot(),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    CarouselModule,
    BsModalModule,
    NgxSpinnerModule,
    MomentModule,
    ChartsModule,
    ScrollbarModule
  ],
  providers: [
    AuthService,
    UserService,
    QuestionsService,
    ChatService,
    SimpleTimer,
    UserResolver,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
