import { from } from 'rxjs';
import { ConfirmPasswordComponent } from './../account/components/confirm-password/confirm-password.component';
import { EnterEmailComponent } from '@app/account/components/enteremail.component';
import { AccountService } from '@app/account/services';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterComponent, ConfirmComponent } from '@app/account/components';
import { MenuController, ModalController } from '@ionic/angular';
import { LoginComponent } from '.././account/components/login.component';
import { ForgotOtpConfirmComponent } from '@app/account/components/forgototpconfirm/forgototpconfirm.component';
import { UserProfileService } from '@app/service-module/user-profile.service';
import { HttpClient } from '@angular/common/http';
import { UserProfileDetails } from '@ojashub/voyaah-common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StaycationPackagesService } from '@app/service-module/staycation-packages.service';
import { ViewChild, ElementRef } from '@angular/core';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {
  @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;
  navs;
  otpconfirmed: any;
  loginModelStatus = true;
  isLoggedIn = false;
  userName = '';
  userNamePrint: any;
  infoMessage = '';
  logInresponce: any;
  userPresent: any;
  Sociallogin: any;
  googleLogin: any;
  googleCheck: any;
  enteredUserDetails: any;
  googleSignup: any;

  iconName: string;
  userNameShow: string;
  userDetails: UserProfileDetails;
  userNavigate: boolean;
  nameChange = true;
  partnerForm: FormGroup;
  submitted = false;
  partnetName = false;
  partnerNameResp: any;
  partnerView = false;
  invalidPartner = false;
  noPackage = false;
  PartnerShow = true;

  constructor(
    private route: Router,
    private homemenu: MenuController,
    public modalController: ModalController,
    private accountService: AccountService,
    private cdRef: ChangeDetectorRef,
    private userProfileService: UserProfileService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private staycationService: StaycationPackagesService
  ) {
    this.reloadUser();
  }

  ngOnInit() {
    this.staycationService.trackStaycationData.subscribe((res) => {
      if (res === true) {
        this.getPartnerDetailsRep();
      }
    });
    this.partnerForm = this.formBuilder.group({
      PartnerName: ['', [Validators.required, Validators.minLength(2)]],
    });
    console.log(this.partnerForm.value.PartnerName, '0');
    this.userDetails = this.userProfileService.getUserDetails();
    this.UserName();
    this.userProfileService.currentUserProfileData.subscribe((res) => {
      this.userDetails = this.userProfileService.getUserDetails();
      this.UserName();
    });
    window.onclick = (e) => {
      if (e.target) {
        this.invalidPartner = false;
        this.noPackage = false;
      }
    };

    this.userProfileService.currentUserNavigate.subscribe((res) => {
      console.log(res, 'rsep');
      this.userNavigate = res;
      if (this.userNavigate === false) {
        this.nameChange = true;
      }
    });
    // let f = 'gana9788@gmail.com';
    // this.http
    //   .post<any>(
    //     'http://localhost:3030/api/change-notify',
    //     JSON.stringify({
    //       notifyType: 0,
    //       data: {
    //         data: {
    //           email: f,
    //           firstName: 'k;l',
    //           lastName: 'kl',
    //         },
    //       },
    //     })
    //   )
    //   .subscribe((res) => {
    //     console.log(res);
    //   });
    this.enteredUserDetails = this.accountService.getCognitoUser();
    console.log(this.enteredUserDetails, 'enteredUserDetails');
    this.accountService.currentLoginEvent.subscribe((x) => {
      switch (x.name) {
        case 'close':
        case 'dismiss':
          this.modalController.dismiss();
          break;
        case 'register':
          this.modalController.dismiss();
          this.presentSignup();

          break;
        case 'login':
          this.modalController.dismiss();
          this.presentLogin();
          break;
        case 'Otp_enter':
          this.modalController.dismiss();
          this.otpEnter();
          break;
        case 'forgot':
          this.modalController.dismiss();
          this.presentForgotPassword();
          break;
        case 'forgotOtp':
          this.modalController.dismiss();
          this.presentForgotOtp((x.data as any).username);
          break;
        case 'forgotConfirmPassword':
          this.modalController.dismiss();
          const data = x.data as any;
          this.presentForgotPasswordConfirm(data.username, data.otp);
          break;
      }
      this.reloadUser();
    });

    this.accountService.user.subscribe((user) => {
      this.reloadUser();
    });
    this.reloadUser();

    //   this.userProfileService.currentUserLogin.subscribe((res) => {
    //  console.log(res)

    this.accountService.isLoggedIn().then((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
    console.log(this.isLoggedIn, 'loggedIn');
  }
  get f() {
    return this.partnerForm.controls;
  }
  // loginSignupTabs() {
  //   this.loginModelStatus = false;
  //   if (this.loginModelStatus === false) {
  //     this.userProfileService.userccNavigate(true);
  //   }
  // }
  UserName() {
    this.userName = this.userDetails.firstName;
    if (this.userName.length > 0) {
      let nameOfUser = this.userName;
      nameOfUser = nameOfUser.substring(1);
      this.nameChange = false;
      this.iconName =
        this.userName[0].toUpperCase() + this.userName[1].toLowerCase();
      this.userNameShow =
        this.userName[0].toUpperCase() + nameOfUser.toLowerCase();
    }
  }
  openhomemenu() {
    this.homemenu.enable(true, 'hm_menu');
    this.homemenu.open('hm_menu');
  }
  menu_click() {
    this.homemenu.close('hm_menu');
  }
  routechange() {
    this.route.navigateByUrl('/destination');
  }
  gotoaccount() {
    this.userProfileService.navigateToTravellers.next('dropdown');
    this.route.navigate(['/myaccount/profile']);
  }
  async presentLogin() {
    const modal = await this.modalController.create({
      component: LoginComponent,
      cssClass: 'login-modal-css',
      // cssClass: 'loginPage',
      componentProps: { value: 123 },
      backdropDismiss: true,
      // presentingElement: await this.modalCtrl.getTop()
    });
    return await modal.present();
  }
  async presentSignup() {
    const modal = await this.modalController.create({
      component: RegisterComponent,
      cssClass: 'signup-modal-css',
      backdropDismiss: true,
      // cssClass: 'loginPage',
      componentProps: { value: 123 },
    });

    return await modal.present();
  }
  async otpEnter() {
    const modal = await this.modalController.create({
      component: ConfirmComponent,
      cssClass: 'signup-modal-css',
      // cssClass: 'loginPage',
      componentProps: { value: 123 },
      backdropDismiss: false,
      // presentingElement: await this.modalCtrl.getTop()
    });
    return await modal.present();
  }
  async presentForgotOtp(username: string) {
    const modal = await this.modalController.create({
      component: ForgotOtpConfirmComponent,
      cssClass: 'forgotOtp-modal-css',
      componentProps: { username },
      backdropDismiss: false,
    });

    return await modal.present();
  }

  async presentForgotPassword() {
    const modal = await this.modalController.create({
      component: EnterEmailComponent,
      cssClass: 'enteremail-modal-css',
    });
    return await modal.present();
  }

  async presentForgotPasswordConfirm(username: string, otp: string) {
    const modal = await this.modalController.create({
      component: ConfirmPasswordComponent,
      cssClass: 'forgotConfirm-modal-css',
      componentProps: { username, otp },
      backdropDismiss: false,
    });
    return await modal.present();
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
  async onSubmit() {
    this.submitted = true;
    try {
      if (this.partnerForm.invalid) {
        return;
      }
      localStorage.setItem('partnerName', this.partnerForm.value.PartnerName);
      await this.staycationService.getPartnerData().then((res) => {
        console.log(res, 'data');
        if (res === 'Invalid Vendor') {
          this.invalidPartner = true;
        } else {
          this.getPartnerDetailsRep();
          this.route.navigateByUrl('/staycation');
        }
      });
    } catch (err) {
      console.log('Partner error submit', err);
    }
  }
  getPartnerDetailsRep() {
    try {
      this.partnerNameResp = this.staycationService.getpackageVenderName();
      console.log(this.partnerNameResp, 'staycationPakage');
      if (
        this.partnerNameResp?.vendorName?.length > 0 &&
        this.partnerNameResp?.travelPackages?.length > 0
      ) {
        this.partnerView = true;
        this.PartnerShow = false;
        this.closeAddExpenseModal.nativeElement.click();
      }
    } catch (err) {
      console.log(err);
    }
  }
  clearPartner() {
    this.staycationService.partnerClear(true);
    this.partnerView = false;
    this.PartnerShow = true;
    this.partnerNameResp = null;
    this.submitted = false;
    this.partnerForm.reset();
    localStorage.removeItem('partnerName');
    this.staycationService.clearPartnerData();
  }

  reloadUser() {
    let userDetail = JSON.parse(localStorage.getItem('user'));

    console.log(this.otpconfirmed);
    this.userPresent = userDetail;
    console.log(this.userPresent, this.googleCheck);
    if (this.userPresent === null) {
      this.loginModelStatus = true;
      this.isLoggedIn = false;
    }
    this.otpconfirmed = localStorage.getItem('otpconfirmed');
    this.googleSignup = localStorage.getItem(
      'amplify-redirected-from-hosted-ui'
    );
    console.log(this.otpconfirmed, this.googleSignup, 'otpconfirmed');
    if (
      (this.userPresent !== null && this.otpconfirmed == 'yes') ||
      (this.userPresent !== null && this.googleSignup == 'true')
    ) {
      let xname = this.userPresent?.username.split('@');
      console.log(this.userPresent, 'userPresent');
      this.infoMessage = xname[0];
      if (this.infoMessage.length > 0) {
        this.userProfileService.userccNavigate(true);
        this.loginModelStatus = false;
      }
    }
    if (
      this.userPresent !== undefined &&
      this.userPresent?.username === 'true'
    ) {
      console.log(this.userPresent, 'user');
      let x = this.userPresent?.username.split('@');
      this.infoMessage = x[0];
    }

    try {
      this.cdRef.detectChanges();
    } catch (e) {}
  }
  userhomeNavigate() {
    this.route.navigate(['/']);
  }

  clearUser() {
    this.loginModelStatus = true;
    this.isLoggedIn = false;
    this.menu_click();
    localStorage.removeItem('user');
    this.reloadUser();

    this.userProfileService.userccNavigate(false);
    this.userProfileService.userccNavigatehome(true);
    this.accountService.logout();
    this.userProfileService.clearOnLogout();
    this.userhomeNavigate();
  }
}
