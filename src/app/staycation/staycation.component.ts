import { Analytics } from 'aws-amplify';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TravelPackage, TravellersDetails } from '@ojashub/voyaah-common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Options } from 'ng5-slider/options';
import { ToastController } from '@ionic/angular';
import { UserProfileService } from '@app/service-module/user-profile.service';
import { StaycationPackagesService } from '@app/service-module/staycation-packages.service';
import { AccountService } from '@app/account/services';

enum CheckBoxType {
  NONE,
}
@Component({
  selector: 'app-staycation',
  templateUrl: './staycation.component.html',
  styleUrls: ['./staycation.component.scss'],
})
export class StaycationComponent implements OnInit {
  cityTourList: any = [
    { id: 1, name: 'Yoga and Wellness' },
    // { id: 2, name: 'Island' },
    { id: 3, name: 'Adventure' },
    // { id: 4, name: 'Desert' },
    //{ id: 5, name: 'Lakes and Rivers' },
    { id: 6, name: 'History and Culture' },
    //{ id: 7, name: 'Metro life' },
    { id: 8, name: 'Beach' },
    { id: 9, name: 'Hills and Mountains' },
    { id: 10, name: 'Forest and Wildlife' },
  ];
  minValue = 5000;
  maxValue = 50000;
  options: Options = {
    floor: 1000,
    ceil: 100000,
  };
  timerange = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  date: Date;
  minDate = new Date();
  maxDate: Date;
  packageValues: any;
  p = 1;
  range: any;
  packages: TravelPackage[];
  packageData: TravelPackage[];
  filterpackages = [];
  cities_list: any;
  filteredItems: any;
  destinationName: any;
  cityName: string;
  showCityNames: boolean;
  isSliderRange: boolean;
  errorMessage = false;
  interval;
  timeLeft: number;
  tourCityNames: any;
  checkedList: any = [];
  minValueRage: any;
  maxValueRage: any;
  copyPackages: any[];
  featuredPackages: any = [];
  errorMessageRange: boolean;
  packagecategoryName: string;
  selectedFilter: string;
  patnerName: any;
  keyPressErrorMessage: boolean;
  dateErrorMessage: boolean;
  endDateMessage: any;
  startDateMessage: any;

  //categoryPackage: any[];
  constructor(
    private Router: Router,
    private staycationService: StaycationPackagesService,
    private formBuilder: FormBuilder,
    public toastController: ToastController,
    private userProfileService: UserProfileService,
    private route: ActivatedRoute,
    private accountService: AccountService
  ) {
    this.staycationService.trackStaycationData.subscribe((status) => {
      if (status === true) {
        this.getStacationsList();
      }
    });

    this.route.params.subscribe((params) => {
      this.packagecategoryName = params.categoryName;
      console.log('peramsssssssssssssssssssssssss', this.packagecategoryName);
      console.log(this.packagecategoryName, 'explorepackageValues');
      if (this.packagecategoryName) this.getCategoryName();
    });
  }
  registerForm: FormGroup;
  submitted = false;
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      destination: [''],
      startDate: [''],
      endDate: [''],
    });
    this.getCItiesList();
  }

  async getStacationsList() {
    let remainPackages = [];
    this.packageData = [];
    this.copyPackages = [];
    this.featuredPackages = [];
    this.packages = [];
    try {
      this.packages = await this.staycationService.stacationList();
      console.log('Stacations', this.packages);
      this.copyPackages = this.packages;
      this.packageData = this.packages;
      //this.categoryPackage = this.packages;
      this.packageData.map((res) => {
        if (res.packageValues?.tags?.length > 0) {
          if (res.packageValues.tags[0] === 'featured') {
            this.featuredPackages.push(res);
          } else {
            remainPackages.push(res);
          }
        }
      });
      for (let i = 0; i < remainPackages.length; i++) {
        this.featuredPackages.push(remainPackages[i]);
      }
      this.packages = this.featuredPackages;
      console.log('getstacationlist', this.packages);
      this.getCategoryName();
    } catch (e) {
      console.log(e);
    }
  }

  // async getPackages() {
  //   try {
  //     this.packages = await this.staycationService.getStaycations();
  //     console.log(this.packages[0].values.tags, 'featured tags');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  UserDetails(reference) {
    console.log('kkkk', reference);
    Analytics.record({
      name: 'SelctedStaycationPackage',
      attributes: { click: reference.toString() },
    });
    let travellers: TravellersDetails = {
      adults: [],
      children: [],
      infants: [],
    };
    this.staycationService.packageReference.next(reference);
    this.staycationService.startDate.next('');
    this.staycationService.staycationTravellers.next(travellers);
    this.userProfileService.travellerSelectionData.next(undefined);
    this.Router.navigate(['/staycation/', reference]);
  }
  get f() {
    return this.registerForm.controls;
  }

  onSumbit() {
    this.submitted = true;
    // stop here if form is invalid
    if (
      this.registerForm.invalid ||
      this.registerForm.controls.destination.value == undefined ||
      this.registerForm.controls.destination.value == '' ||
      this.registerForm.controls.destination.value == null
    ) {
      this.errorMessage = false;
      // return;
    }
    this.destinationName = this.registerForm.controls.destination.value;
    if (this.tourCityNames) {
      this.getAdvanceTourFilter();
    } else if (this.destinationName) {
      this.getDestination();
    }
    this.getstartFormDate();
    // this.getSlideRagne();
  }
  getstartFormDate() {
    const endDate = this.registerForm.controls.endDate.value
      ? this.registerForm.controls.endDate.value.toISOString()
      : '';
    const startDate = this.registerForm.controls.startDate.value
      ? this.registerForm.controls.startDate.value.toISOString()
      : '';
    const result = [];
    const tempPackages = this.copyPackages;
    tempPackages.map((ele) => {
      if (endDate && startDate) {
        if (
          endDate.slice(0, 10) <= ele.availableUpTo.slice(0, 10) &&
          startDate.slice(0, 10) >= ele.availableFrom.slice(0, 10)
        )
          return result.push(ele);
      }
    });
    if (endDate && startDate) {
      if (result.length === 0) {
        this.packages = this.copyPackages;
        this.dateErrorMessage=true
        setTimeout(() => {
          this.dateErrorMessage = false;
        }, 2500);
        this.endDateMessage=endDate
        this.startDateMessage=startDate
        console.log('startDate', this.packages);
        this.registerForm.reset();
        return this.packages;
      }
    }
    if (result.length > 0) {
      this.packages = result;
      console.log('endDate', this.packages);
      this.registerForm.reset();
      return this.packages;
    }
  }

  // Get Destination List from api
  async getCItiesList() {
    try {
      this.staycationService.getcitylist().subscribe((result) => {
        this.cities_list = result;
        console.log(this.cities_list, 'Data is fetching. . .');
        // return result;
      });
    } catch (error) {
      console.log('while getting data is err', error);
    }
  }

  //  Destination cityList filters

  filterItem(e) {
    //console.log('heloooo', e.target.value.length);
    let datalist: TravelPackage[] = this.packages;
    if (e.target.value.length == 0) {
      this.packages = this.packageData;
    }
    if (e.target.value) {
      let data: TravelPackage[];
      data = this.packages.filter((res) => {
        return res.packageValues.name
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      });
      if (data) {
        this.packages = data;
      } else {
        this.packages = this.packageData;
      }
      if (data.length === 0) {
        this.packages = this.packageData;
        this.keyPressErrorMessage = true;
        setTimeout(() => {
          this.keyPressErrorMessage = false;
        }, 2500);
      }
    } else {
      this.packages = this.packageData;
    }
    //TODO: use the below things for cards on search
    // if (e.length == 0) {
    //   this.packages = datalist;
    //   this.showCityNames = true;
    // }
    // if (e.length < 1) {
    //   this.showCityNames = false;
    // }

    // if (data.length > 1) {
    //   this.packages = data;
    // } else {
    //   this.packages = datalist;
    // }
    // console.log('llo', data);
    // when nothing has typed
    // this.filteredItems = Object.assign([], this.cities_list).filter(
    //   (item) =>
    //     item.destinationName.toLowerCase().indexOf(value.toLowerCase()) > -1
    // );
  }
  // Get Destination ClityList from api
  async getDestination() {
    try {
      this.staycationService
        .getDestinationCity(this.destinationName)
        .subscribe((result) => {
          if (result.length === 0) {
            this.errorMessage = true;
            this.getStacationsList();
          }
          if ((this.packages = result)) {
            return result;
          }
        });
      this.interval = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          clearInterval(this.interval);
          this.errorMessage = false;
          this.timeLeft = null;
          return;
        }
      }, 2500);
    } catch (error) {
      console.log('while getting data is err', error);
    }
  }

  // get Tour Categories from api

  async getAdvanceTourFilter() {
    try {
      this.staycationService
        .getAdvanceTourCategories(this.tourCityNames)
        .subscribe((tourCitysResponce) => {
          if (tourCitysResponce.length === 0) {
            //this.errorMessage = true;
            this.getStacationsList();
            let toast = this.toastController.create({
              message: `No tour categories avaliable at "${this.tourCityNames}"`,
              duration: 1500,
              position: 'middle',
              cssClass: 'toast-scheme',
            });
            toast.then((toast) => toast.present());
          }
          // else {
          //   this.errorMessage = false;
          // }
          if ((this.packages = tourCitysResponce)) {
            return tourCitysResponce;
          }
        });
    } catch (error) { }
  }

  getCity(name) {
    this.cityName = name;
    this.showCityNames = false;
  }
  sliderForm() {
    this.isSliderRange = !this.isSliderRange;
    event.stopPropagation();
  }
  keyPress(event: any) {
    const pattern = /^[a-zA-Z ]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
  closeFilter() {
    this.selectedFilter = '';
    this.getStacationsList();
  }

  // checkbox Tour Categories names
  checkboxChange(name) {
    this.selectedFilter = name;
    // console.log(this.selectedFilter, 'selected name');
    let tourCategorys: any = [];
    const tempPackages = this.copyPackages;
    tempPackages.map((res) => {
      if (res.packageValues?.category?.length > 0) {
        for (let i = 0; i < res.packageValues?.category?.length; i++) {
          if (name === res.packageValues.category[i]) {
            tourCategorys.push(res);
            this.packages = tourCategorys;
            return this.packages;
          }
        }
      }
    });
    console.log('tourCategorys', this.packages);
  }

  currentlyChecked: CheckBoxType;
  //currentlyChecked: CheckBoxType;
  selectCheckBox(targetType: CheckBoxType) {
    if (this.cityTourList.name === targetType) {
      this.currentlyChecked = CheckBoxType.NONE;
      return this.packages;
    }
    this.currentlyChecked = targetType;
  }
  onCheckboxChange(option, event) {
    if (event.target.checked) {
      console.log('', event.target.checked);
      this.checkedList.push(option.name);
    } else {
      for (var i = 0; i < this.cityTourList.length; i++) {
        if (this.checkedList[i] == option.value) {
          this.checkedList.splice(i, 1);
          this.getStacationsList();
        }
      }
    }
    this.tourCityNames = this.checkedList + '';
    console.log(this.tourCityNames, 'rep');
  }

  // slider range max and min
  valueChange(minValue, maxValue) {
    this.minValueRage = minValue;
    this.maxValueRage = maxValue;
    try {
      let result = [];
      const tempPackages = this.copyPackages;
      tempPackages.map((ele) => {
        if (ele.packageValues.fare) {
          if (
            ele.packageValues.fare.totalFare <= this.maxValueRage &&
            ele.packageValues.fare.totalFare >= this.minValueRage
          ) {
            result.push(ele);
          }
        }
      });
      if (result.length > 0) {
        this.packages = result;
        this.errorMessageRange = false;
        return this.packages;
      }
      if (result.length === 0) {
        this.packages = this.copyPackages;
        this.errorMessageRange = true;
        setTimeout(() => {
          //<<<---using ()=> syntax
          this.errorMessageRange = false;
        }, 3000);
        return this.packages;
      }
    } catch (error) {
      console.log(error);
    }
  }

  sort(event: any) {
    // if (event.target.value === 'Low') {
    //   this.packages = this.packages.sort(
    //     (low, high) => low.values.fare.totalFare - high.values.fare.totalFare
    //   );
    // } else if (event.target.value === 'High') {
    //   this.packages = this.packages.sort(
    //     (low, high) => high.values.fare.totalFare - low.values.fare.totalFare
    //   );
    // }
    switch (event.target.value) {
      case 'Low': {
        this.packages = this.packages.sort(
          (low, high) =>
            low.packageValues.fare.totalFare - high.packageValues.fare.totalFare
        );
        break;
      }

      case 'High': {
        this.packages = this.packages.sort(
          (low, high) =>
            high.packageValues.fare.totalFare - low.packageValues.fare.totalFare
        );
        break;
      }
      case 'az': {
        this.packages = this.packages.sort(function (low, high) {
          if (low.packageValues.name < high.packageValues.name) {
            return -1;
          } else if (low.packageValues.name > high.packageValues.name) {
            return 1;
          } else {
            return 0;
          }
        });
        break;
      }
      case 'za': {
        this.packages = this.packages.sort(function (low, high) {
          if (low.packageValues.name > high.packageValues.name) {
            return -1;
          } else if (low.packageValues.name < high.packageValues.name) {
            return 1;
          } else {
            return 0;
          }
        });
        break;
      }
    }
    return this.packages;
  }

  async getCategoryName() {
    try {
      const packages = await this.staycationService.stacationList();
      const categoryPackage = packages;
      let categorys: any = [];
      if (this.packagecategoryName) {
        if (categoryPackage) {
          categoryPackage.map((res) => {
            if (res.packageValues?.category?.length > 0) {
              for (let i = 0; i < res.packageValues?.category?.length; i++) {
                if (
                  this.packagecategoryName === res.packageValues.category[i]
                ) {
                  categorys.push(res);
                }
              }
            }
          });
          if (categorys.length > 0) {
            this.packages = [];
            this.packages = categorys;
            console.log('tourCategorys22222222222', this.packages);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  goToContact() {
    this.Router.navigate([''], { fragment: 'contactDiv' });
  }
}
