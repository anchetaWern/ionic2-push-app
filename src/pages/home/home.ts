import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Push, PushToken, Auth, User, UserDetails } from '@ionic/cloud-angular';
import { UserPage } from '../user-page/user-page';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor(public navCtrl: NavController, public push: Push, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public auth: Auth, public user: User) {

    if (this.auth.isAuthenticated()) {
      this.navCtrl.push(UserPage);
    }

  }


  login() {

    let loader = this.loadingCtrl.create({
      content: "Logging in..."
    });

    loader.present();

    setTimeout(() => {
      loader.dismiss();
    }, 5000);

    let details: UserDetails = {
      'email': 'YOUR IONIC AUTH USER',
      'password': "YOUR IONIC AUTH USER'S PASSWORD"
    };

    this.auth.login('basic', details).then((res) => {

      this.push.register().then((t: PushToken) => {
        return this.push.saveToken(t);
      }).then((t: PushToken) => {

        loader.dismiss();
        this.navCtrl.push(UserPage);

      }, (err) => {

        let alert = this.alertCtrl.create({
          title: 'Push registration failed',
          subTitle: 'Something went wrong with push notifications registration. Please try again.',
          buttons: ['OK']
        });
        alert.present();

      });

    }, () => {

      let alert = this.alertCtrl.create({
        title: 'Login Failed',
        subTitle: 'Invalid Credentials. Please try again.',
        buttons: ['OK']
      });
      alert.present();

    });

  }


}
