import { Component } from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class Contact {
  emailCopied = false;
  email = 'kmzeliasz@gmail.com';

  copyEmail() {
    navigator.clipboard.writeText(this.email).then(() => {
      this.emailCopied = true;
      setTimeout(() => this.emailCopied = false, 1500);
    });
  }
}
