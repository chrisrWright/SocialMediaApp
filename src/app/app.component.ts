import { Component } from '@angular/core';
import { MatBottomSheet} from '@angular/material/bottom-sheet';
import { AuthenticatorComponent } from 'src/app/tools/authenticator/authenticator.component';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import {  Router} from '@angular/router';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SocialMediaApp';
  auth = new FirebaseTSAuth();
  firestore = new FirebaseTSFirestore();
  userHasProfile = true;
  userDocument!: UserDocument;

  constructor(private loginSheet : MatBottomSheet,
    private router: Router)
  {
    this.auth.listenToSignInStateChanges(
      user => {
        this.auth.checkSignInState(
          {
            whenSignedIn: user => {


            },
            whenSignedOut: user => {

            },
            whenSignedInAndEmailNotVerified: user => {
              this.router.navigate(["emailVerification"]);
            },
            whenSignedInAndEmailVerified: user => {

            // this.getUserProfile();
            this.router.navigate(["postfeed"]);

            },
            whenChanged: user => {

            }

          }
        );
      }
    );
  }

  // getUserProfile()
  // {
  //   this.firestore.listenToDocument(
  //     {
  //       name: "",
  //       path: ["Users", this.auth.getAuth().currentUser!.uid],
  //       onUpdate: (result) => {
  //         this.userDocument = <UserDocument>result.data();
  //
  //         this.userHasProfile = result.exists;
  //         if(this.userHasProfile)
  //         {
  //           this.router.navigate(["postfeed"]);
  //         }
  //
  //       }
  //     }
  //   );
  // }

  onLogoutClick()
  {
    this.auth.signOut();
  }

  loggedIn()
  {
    return this.auth.isSignedIn();
  }


  onLoginClick()
  {
    this.loginSheet.open(AuthenticatorComponent);
  }
}

export interface UserDocument {
  publicName: string;
  description: string;
}
