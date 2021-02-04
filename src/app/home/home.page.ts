import { Component } from '@angular/core';

import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private qrScanner: QRScanner) {}

  scan(){
    this.qrScanner.prepare()
    .then((status: QRScannerStatus) => {
      if (status.authorized) {
        // camera permission was granted


        // start scanning
        let scanSub = this.qrScanner.scan().subscribe((text: string) => {
          alert('Scanned something' + text);

         // this.qrScanner.hide(); // hide camera preview
          //scanSub.unsubscribe(); // stop scanning
        });

      } else if (status.denied) {
        alert("Permision dinied permanently")
        // camera permission was permanently denied
        // you must use QRScanner.openSettings() method to guide the user to the settings page
        // then they can grant the permission from there
      } else {
        alert("Permision dinied temporaly")
        // permission was denied, but not permanently. You can ask for permission again at a later time.
      }
    })
    .catch((e: any) => alert('Error is' + e));

  }

}
