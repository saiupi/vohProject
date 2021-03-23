import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangeNotifyService } from '../../service-module/change-notify.service';
import { IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
})
export class AboutUsComponent implements OnInit {
  slideOptsOne = {
    speed: 1000,
    initialSlide: 0,
    autoplay: true,
    loop: true,
    centerInsufficientSlides: true,
    centeredSlides: true,
    followFinger: true,
    roundLengths: true,
    spaceBetween: 10,
    slideToClickedSlide: true,
    pager: true,
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
      },
      // when window width is >= 640px
      576: {
        slidesPerView: 3,
      },
      920: {
        slidesPerView: 4,
      },
    },
  };

  images: any;
  collapse: any;
  faqs_data: any;
  registerForm: FormGroup;
  bannerImage: any;
  travelImage: any;
  teamImage: any;
  submitted = false;
  toastMsg = false;
  interval;
  timeLeft: number;

  // regarding slider start
  @ViewChild(IonSlides) slides: IonSlides;
  @ViewChild('slideWithNav2', { static: false }) slideWithNav2: IonSlides;
  @ViewChild('slideWithNav3', { static: false }) slideWithNav3: IonSlides;
  slidePre() {
    this.slides.slidePrev();
  }
  slideNex() {
    this.slides.slideNext();
  }
  // regarding slider end

  constructor(
    private formBuilder: FormBuilder,
    private ChangeNotifyService: ChangeNotifyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.bannerImage = [
      {
        bannerImage: `${environment.S3BucketUrlForPackagesAboutPage}/public/about/AboutUsBanner.png`,
      },
    ];
    this.travelImage = [
      {
        travelImage: `${environment.S3BucketUrlForPackagesAboutPage}/public/about/Travel.png`,
      },
    ];
    this.teamImage = [
      {
        sharmisthaImage: `${environment.S3BucketUrlForPackagesAboutPage}/public/about/Sharmistha-Alok-Chakraborty.png`,
      },
    ];
    this.images = [
      {
        image: `${environment.S3BucketUrlForPackagesAboutPage}/public/about/Krishna.png`,
        position: 'Sr .Manager - Sales & Business Development',
        title: 'K.Krishna Raj',
        description:
          // eslint-disable-next-line max-len
          'Having worked in the travel & tourism industry for the last ten years, leading the Franchisee & Retail divisions of SOTC, Thomas cook & Cox and kings, Krishna comes with a wealth of experience in business development. He has been awarded the 2nd best franchisee in terms of sales in the South Market for Thomas Cook 2015-16. The challenge of working in a travel start up brings alive the entrepreneurial side of him. Krishna has a keen sense of football as he does of travel.',
      },
      {
        image: `${environment.S3BucketUrlForPackagesAboutPage}/public/about/Taher.png`,
        position: 'Manager – Sales & Business Development',
        title: 'Taher Nakara',
        description:
          // eslint-disable-next-line max-len
          'The ardent passion for travelling and exploring the unknown has led Taher to convert his hobby into his profession. He upholds the philosophy of the journey meaning more than the destination. What he is pitching to clients is not just a travel package but what he believes to be a lifelong experience of beautiful long lasting memories. Taher is zealous about getting things done and is always on board with any new challenge that the organization takes up.',
      },
      {
        image: `${environment.S3BucketUrlForPackagesAboutPage}/public/about/Bharat.png`,
        position: 'Manager- Sales & Business Development',
        title: 'Bharath Shivakumar',
        description:
          // eslint-disable-next-line max-len
          'With five years of experience in MICE sales and operations, having operated MICE groups of 500 and more passengers single handedly, Bharath has travelled over ten countries. Having done his MBA in Travel and Tourism and going on to work in the likes of FCM Mice and Cox and Kings, Bharath has an indepth understanding of the inner workings of the travel industry. He is a fun loving person who likes to make and share memes and likes to cook, travel to unexplored places, ride bikes and drive.',
      },
      {
        image: `${environment.S3BucketUrlForPackagesAboutPage}/public/about/Joyti.png`,
        position: 'Business Development',
        title: 'Joyti Solanki Vaza',
        // eslint-disable-next-line max-len
        description:
          // eslint-disable-next-line max-len
          'Hailing from a very diverse background ranging from Talent acquisition to Event Management, Joyti finally found her heart in travel about three years back. She finds her core calling in handling operations. Working with a startup has unique challenges of its own which Joyti finds instrumental in her growth. Apart from adventuring under water she loves to cook and likes gardening.',
      },
      {
        image: `${environment.S3BucketUrlForPackagesAboutPage}/public/about/Suchita.png`,
        position: 'Manager - Products',
        title: 'Suchita Rane',
        description:
          // eslint-disable-next-line max-len
          'Being in the industry for twelve long years with the likes of SOTC and Europe DMC Tourkraft, Suchita loves the adrenaline rush of discovering new places. She believes in the saying, “the journey of life is not meant to be feared and planned; It is meant to be travelled and enjoyed.” A soulful adventurer, with music in her ears and a book in hand, journeying on endless expeditions, she is a proud participant of the ‘League of Champions’ touring Portugal and Spain.',
      },
      {
        image: `${environment.S3BucketUrlForPackagesAboutPage}/public/about/Twinkle.png`,
        position: 'Manager – Creative Design',
        title: 'Twinkle Rathore',
        description:
          // eslint-disable-next-line max-len
          'A graduate in Communication Design from NIFT Mumbai, Twinke has her heart in travel and her mind in design.  An avid reader, she is always well versed with what is going on. A lot of research goes into the final creative output, with the look and feel, the colour palette, the design and the aesthetics being in place thanks to her expertise. Being a pet parent, Twinkle enjoys cooking, clicking photographs and collecting illustrated novels.',
      },
      {
        image: `${environment.S3BucketUrlForPackagesAboutPage}/public/about/Sumanjari.png`,
        position: 'Manager – Content Development',
        title: 'Sumanjari Sengupta',
        description:
          // eslint-disable-next-line max-len
          'A post-graduate in the Social Sciences, Sumanjari has a background of academic scholarship as well as advertising and marketing, making her contribution to the role of content development dynamic. She likes to get to the depth of what she writes about in terms of people, places and culture so experiential travel content is something of keen interest to her. She has a specialization in luxury branded content. A coffee aficionado and a nature lover, she likes all things hygge.',
      },
      {
        image: `${environment.S3BucketUrlForPackagesAboutPage}/public/about/HirenGhughal4.png`,
        position: 'Head – Data & Technology',
        title: 'Hiren Ghughal',
        description:
          // eslint-disable-next-line max-len
          'An IIT Bombay alumnus, Hiren works round the clock to ensure that our end to end booking portal is functional and sound, continuously upscaling to the latest technology to suit the need of the hour. Apart from all things tech, a trek a month is must for him. He loves biking and likes playing cricket. Travel has been a lifelong passion for him and he likes to share his insights on current affairs as much as he likes to do his R&D on technology.',
      },
      {
        image: `${environment.S3BucketUrlForPackagesAboutPage}/public/about/Deepali.png`,
        position: 'Sr. Manager – Hotel Contracting',
        title: 'Deepali R Padalkar',
        description:
          // eslint-disable-next-line max-len
          'Having an experience of over twelve years in travel, Deepali has been awarded several Star performer awards for consecutive years at Cox And Kings. She has the experience of leading from the front on more than one occasion. She has a penchant for collecting stamps and coins and loves to gym and ride bikes. She dreams of travelling the world and has a bucket list that she keeps building on dedicatedly.',
      },
      {
        image: `${environment.S3BucketUrlForPackagesAboutPage}/public/about/Pallavi.png`,
        position: 'Product Advisor',
        title: 'Pallavi Chitre',
        description:
          // eslint-disable-next-line max-len
          'A travel enthusiast who has worked in the industry for over fifteen years with the thought leaders of travel, Pallavi puts her heart and soul in routing the perfect journey for our clients. One of the most well travelled in the team, Pallavi loves to have a finger on the pulse of current affairs. Being a voracious reader, she is always on board with trending destinations and offbeat places that are now coming up. She doesn’t like a cluttered table and likes to explore culinary travel.',
      },
    ];
    this.collapse = [
      {
        id: 1,
        title: 'Payments:',
        description: 'test data',
      },
      {
        id: 2,
        title: 'Mode of Payment',
        description: 'test data',
      },
      {
        id: 3,
        title: 'Cancellation Policy',
        description: 'test data',
      },
      {
        id: 4,
        title: 'Note',
        description: 'test data',
      },
    ];
    this.faqs_data = [
      {
        id: 5,
        title: 'FAQ I',
        description: 'test data',
      },
      {
        id: 6,
        title: 'FAQ II',
        description: 'test data',
      },
      {
        id: 7,
        title: 'FAQ III',
        description: 'test data',
      },
      {
        id: 8,
        title: 'FAQ IV',
        description: 'test data',
      },
      { id: 9, title: 'FAQ V', description: 'test data' },
    ];

    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      number: ['', Validators.required],
      message: ['', Validators.required],
    });
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }
  goToContact() {
    this.router.navigate([''], { fragment: 'contactDiv' });
  }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    const data: any = this.registerForm.value;

    if (data) {
      this.toastMsg = true;
      this.interval = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          clearInterval(this.interval);
          this.toastMsg = false;
          this.timeLeft = null;
          return;
        }
      }, 2500);

      // Email Notify call change-notify service.
      this.ChangeNotifyService.userQueryNotify(
        data.name,
        data.email,
        data.number,
        data.message
      );

      this.registerForm.reset();
      this.submitted = false;
    }
  }
}
