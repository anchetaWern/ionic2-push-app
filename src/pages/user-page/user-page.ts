import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Push, Auth } from '@ionic/cloud-angular';

@Component({
  selector: 'page-user-page',
  templateUrl: 'user-page.html',
})

export class UserPage {

  constructor(public navCtrl: NavController, public push: Push, public auth: Auth, public alertCtrl: AlertController) {

    this.push.rx.notification()
      .subscribe((msg) => {

        let alert = this.alertCtrl.create({
          title: msg.title,
          subTitle: msg.text,
          buttons: ['OK']
        });
        alert.present();

      });

  }

  logout() {
    this.auth.logout();
    this.navCtrl.pop();
  }

}
