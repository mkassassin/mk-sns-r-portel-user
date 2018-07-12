import {  Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { MatSnackBar } from '@angular/material';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

import { OnlineFormService } from './../Service/online-form/online-form.service';
import { Dropdown } from 'primeng/primeng';

@Component({
  selector: 'app-online-form',
  templateUrl: './online-form.component.html',
  styleUrls: ['./online-form.component.css']
})
export class OnlineFormComponent implements OnInit {

  bsConfig: Partial<BsDatepickerConfig>;

  @ViewChild('fileInputFile') fileInputFile: ElementRef;
  @ViewChild('fileInputPhoto') fileInputPhoto: ElementRef;
  @ViewChild('fileInputSign') fileInputSign: ElementRef;

  Institute_Type;
  Online_Form_Type = 0;

  FormData: FormData = new FormData;
  Uploaded_File;
  Uploaded_File_alert = '';
  Uploaded_Photo;
  Uploaded_Photo_alert = '';
  Uploaded_Sign;
  Uploaded_Sign_alert = '';

  isLinear = false;
  FormGroup: FormGroup;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;

  FormGroup_Clicked: Boolean = false;
  firstFormGroup_Clicked: Boolean = false;
  secondFormGroup_Clicked: Boolean = false;
  thirdFormGroup_Valid: Boolean = false;
  fourthFormGroup_Valid: Boolean = false;

  gender: String = 'Male';
  mar_status: String = 'Single';
  Experience_status: String = 'Fresher';


  selectedCity;

  PresentSate;

  Nationalities = [
    {name: 'Indian'},
    {name: 'Others'}
  ];

  Religions = [
    {name: 'Hindu'},
    {name: 'Muslim'},
    {name: 'Christian'},
    {name: 'Sikh'},
    {name: 'Buddhist'},
    {name: 'Others'}
  ];

  Communities = [
    {name: 'BC'},
    {name: 'BCM'},
    {name: 'DC'},
    {name: 'MBC'},
    {name: 'ST'},
    {name: 'SC'},
    {name: 'Others'}
  ];

  Genders = [
    {name: 'Male'},
    {name: 'Female'}
  ];

  States = [
    {'code': 'AN', 'name': 'Andaman and Nicobar Islands'},
    {'code': 'AP', 'name': 'Andhra Pradesh'},
    {'code': 'AR', 'name': 'Arunachal Pradesh'},
    {'code': 'AS', 'name': 'Assam'},
    {'code': 'BR', 'name': 'Bihar'},
    {'code': 'CG', 'name': 'Chandigarh'},
    {'code': 'CH', 'name': 'Chhattisgarh'},
    {'code': 'DH', 'name': 'Dadra and Nagar Haveli'},
    {'code': 'DD', 'name': 'Daman and Diu'},
    {'code': 'DL', 'name': 'Delhi'},
    {'code': 'GA', 'name': 'Goa'},
    {'code': 'GJ', 'name': 'Gujarat'},
    {'code': 'HR', 'name': 'Haryana'},
    {'code': 'HP', 'name': 'Himachal Pradesh'},
    {'code': 'JK', 'name': 'Jammu and Kashmir'},
    {'code': 'JH', 'name': 'Jharkhand'},
    {'code': 'KA', 'name': 'Karnataka'},
    {'code': 'KL', 'name': 'Kerala'},
    {'code': 'LD', 'name': 'Lakshadweep'},
    {'code': 'MP', 'name': 'Madhya Pradesh'},
    {'code': 'MH', 'name': 'Maharashtra'},
    {'code': 'MN', 'name': 'Manipur'},
    {'code': 'ML', 'name': 'Meghalaya'},
    {'code': 'MZ', 'name': 'Mizoram'},
    {'code': 'NL', 'name': 'Nagaland'},
    {'code': 'OR', 'name': 'Odisha'},
    {'code': 'PY', 'name': 'Puducherry'},
    {'code': 'PB', 'name': 'Punjab'},
    {'code': 'RJ', 'name': 'Rajasthan'},
    {'code': 'SK', 'name': 'Sikkim'},
    {'code': 'TN', 'name': 'Tamil Nadu'},
    {'code': 'TS', 'name': 'Telangana'},
    {'code': 'TR', 'name': 'Tripura'},
    {'code': 'UK', 'name': 'Uttarakhand'},
    {'code': 'UP', 'name': 'Uttar Pradesh'},
    {'code': 'WB', 'name': 'West Bengal'}
  ];

  Medium = [
    {name: 'English'},
    {name: 'Tamil'},
    {name: 'Other'}
  ];

  Applied_For = [
    { name: 'Assistant Professor'},
    { name: 'Associate Professor'},
    { name: 'Professor'},
    { name: 'HOD/Dean'},
    { name: 'Principal'}
  ];

  Applied_Departments = [
    { name: 'Aeronautical Engineering'},
    { name: 'Agriculture Engineering'},
    { name: 'Automobile Engineering'},
    { name: 'Biomedical Engineering'},
    { name: 'Civil Engineering'},
    { name: 'Civil Engineering and Planning'},
    { name: 'Computer Science Engineering'},
    { name: 'Electrical and Electronics Engineering'},
    { name: 'Electronics and Communication Engineering'},
    { name: 'Electronics and Instrumentation Engineering'},
    { name: 'Information Technology'},
    { name: 'Mechanical Engineering'},
    { name: 'Mechanical and Automation Engineering'},
    { name: 'Mechatronics Engineering'},
    { name: 'Master of Business Administration'},
    { name: 'Master of Computer Application'},
    { name: 'Science & Humanities'},
    { name: 'Department of Physical Education'},
  ];

  Grade_Class = [
    {name: 'FWD*'},
    {name: 'I Class'},
    {name: 'II Class'}
  ];

  PgCourses = [
    {name: 'MA'},
    {name: 'MSC'},
    {name: 'MBA'},
    {name: 'MCom'},
    {name: 'MCA'},
    {name: 'ME/M.Tech'},
    {name: 'Others'}
  ];

  UgCourses = [
    {name: 'BA'},
    {name: 'BSc'},
    {name: 'BCA'},
    {name: 'BCom'},
    {name: 'BBA'},
    {name: 'BE/B.Tech'},
    {name: 'Others'}
  ];

  MphilCourses = [
    {name: 'Mphil'},
    {name: 'Others'}
  ];

  PhdCourses = [
    {name: 'Phd'},
    {name: 'Others'}
  ];

  Experience_Type = [
    {name: 'Teaching'},
    {name: 'Admin'}
  ];

  Attended_As = [
    {name: 'Student'},
    {name: 'Faculty'}
  ];

  Patent_Status = [
    {name: 'Filed'},
    {name: 'Published'},
    {name: 'Granted'}
  ];

  ShowKidsInfo: Boolean = false;
  kids_List;
  Teaching_Experience;
  Industry_Experience;

  Attended_FDP_Details;
  Attended_Workshop_Details;
  Attended_Conference_Details;
  Attended_Symposium_Details;

  Organized_FDP_Details;
  Organized_Workshop_Details;
  Organized_Conference_Details;
  Organized_Symposium_Details;

  Paper_Presentation;
  Project_Presentation;
  UG_Project;
  PG_Project;
  Patent;
  Journal;
  Achievements_Awards;
  Family_in_SNS_Details;


  constructor(private _formBuilder: FormBuilder,
              public snackBar: MatSnackBar,
              private router: Router,
              private Active_route: ActivatedRoute,
              private Service: OnlineFormService) {
    this.bsConfig = Object.assign({}, { containerClass: 'theme-red', dateInputFormat: 'DD/MM/YYYY' });
    this.Active_route.params.subscribe(res => {
      this.Institute_Type = res.Type;
      if (res.Type === 'Technology' || res.Type === 'Engineering' ) {
        this.Online_Form_Type = 1;
      } else if (res.Type === 'Arts') {
        this.Online_Form_Type = 2;
      } else if (res.Type === 'Education') {
        this.Online_Form_Type = 3;
      } else  if (res.Type === 'School') {
        this.Online_Form_Type = 4;
      } else {
        this.Online_Form_Type = 0;
      }
    });
   }

   ngOnInit() {

    this.FormGroup = this._formBuilder.group({
      Post_Applied: new FormControl('', Validators.required),
      Department: new FormControl('', Validators.required),
      Preferred_Subject_1: new FormControl(''),
      Preferred_Subject_2: new FormControl(''),
      Preferred_Subject_3: new FormControl(''),
    });

    this.firstFormGroup = this._formBuilder.group({
      Name: new FormControl('', Validators.required),
      DOB: new FormControl('', Validators.required),
      Age: new FormControl('', Validators.required),
      Gender: new FormControl('', Validators.required),
      Place_of_Birth: new FormControl('', Validators.required),
      Nationality: new FormControl('', Validators.required),
      Religion: new FormControl('', Validators.required),
      Community: new FormControl('', Validators.required),
      Caste: new FormControl('', Validators.required),
      Aadhar_No: new FormControl('', Validators.required),
      PAN_No: new FormControl(''),
      Contact_No: new FormControl('', Validators.required),
      Email: new FormControl('', [ Validators.required, Validators.email]),
      Permanent_Door_No: new FormControl('', Validators.required),
      Permanent_Street: new FormControl('', Validators.required),
      Permanent_City: new FormControl('', Validators.required),
      Permanent_Sate: new FormControl('', Validators.required),
      Permanent_Pin_Code: new FormControl('', Validators.required),
      Address_Same: new FormControl(''),
      Present_Door_No: new FormControl('', Validators.required),
      Present_Street: new FormControl('', Validators.required),
      Present_City: new FormControl('', Validators.required),
      Present_Sate: new FormControl('', Validators.required),
      Present_Pin_Code: new FormControl('', Validators.required),
      Marital_Status: new FormControl('', Validators.required),
      Father_Name: new FormControl('', Validators.required),
      Father_Designation: new FormControl(''),
      Father_Organization: new FormControl(''),
      Father_Locality: new FormControl(''),
      Mother_Name: new FormControl('', Validators.required),
      Mother_Designation: new FormControl(''),
      Mother_Organization: new FormControl(''),
      Mother_Locality: new FormControl(''),
      Spouse_Name: new FormControl(''),
      Spouse_Designation: new FormControl(''),
      Spouse_Organization: new FormControl(''),
      Spouse_Locality: new FormControl(''),
      No_Of_Siblings: new FormControl(''),
      No_Of_Kids: new FormControl(''),
      kids_List: this._formBuilder.array([ ])
    });

    this.secondFormGroup = this._formBuilder.group({

      UG_Course: new FormControl(''),
      UG_Department: new FormControl(''),
      UG_Class: new FormControl(''),
      UG_Year_Of_Passing: new FormControl(''),
      UG_College_Name: new FormControl(''),
      UG_CGPA: new FormControl(''),
      UG_Percentage: new FormControl(''),
      UG_Medium: new FormControl(''),

      PG_Course: new FormControl(''),
      PG_Department: new FormControl(''),
      PG_Class: new FormControl(''),
      PG_Year_Of_Passing: new FormControl(''),
      PG_College_Name: new FormControl(''),
      PG_CGPA: new FormControl(''),
      PG_Percentage: new FormControl(''),
      PG_Medium: new FormControl(''),

      Mphil_Course: new FormControl(''),
      Mphil_Department: new FormControl(''),
      Mphil_Class: new FormControl(''),
      Mphil_Year_Of_Passing: new FormControl(''),
      Mphil_College_Name: new FormControl(''),
      Mphil_CGPA: new FormControl(''),
      Mphil_Percentage: new FormControl(''),
      Mphil_Medium: new FormControl(''),

      PHD_Course: new FormControl(''),
      PHD_Department: new FormControl(''),
      PHD_Class: new FormControl(''),
      PHD_Year_Of_Passing: new FormControl(''),
      PHD_College_Name: new FormControl(''),
      PHD_CGPA: new FormControl(''),
      PHD_Percentage: new FormControl(''),
      PHD_Medium: new FormControl(''),

      Bed_Course: new FormControl(''),
      Bed_Department: new FormControl(''),
      Bed_Class: new FormControl(''),
      Bed_Year_Of_Passing: new FormControl(''),
      Bed_College_Name: new FormControl(''),
      Bed_CGPA: new FormControl(''),
      Bed_Percentage: new FormControl(''),
      Bed_Medium: new FormControl(''),

      Med_Course: new FormControl(''),
      Med_Department: new FormControl(''),
      Med_Class: new FormControl(''),
      Med_Year_Of_Passing: new FormControl(''),
      Med_College_Name: new FormControl(''),
      Med_CGPA: new FormControl(''),
      Med_Percentage: new FormControl(''),
      Med_Medium: new FormControl(''),

      Other1_Course: new FormControl(''),
      Other1_Department: new FormControl(''),
      Other1_Class: new FormControl(''),
      Other1_Year_Of_Passing: new FormControl(''),
      Other1_College_Name: new FormControl(''),
      Other1_CGPA: new FormControl(''),
      Other1_Percentage: new FormControl(''),
      Other1_Medium: new FormControl(''),


      Other2_Course: new FormControl(''),
      Other2_Department: new FormControl(''),
      Other2_Class: new FormControl(''),
      Other2_Year_Of_Passing: new FormControl(''),
      Other2_College_Name: new FormControl(''),
      Other2_CGPA: new FormControl(''),
      Other2_Percentage: new FormControl(''),
      Other2_Medium: new FormControl(''),

      Hsl_School: new FormControl(''),
      Hsl_Medium: new FormControl(''),
      Hsl_Year_Of_Passing: new FormControl(''),
      Hsl_Percentage: new FormControl(''),

      Sslc_School: new FormControl(''),
      Sslc_Medium: new FormControl(''),
      Sslc_Year_Of_Passing: new FormControl(''),
      Sslc_Percentage: new FormControl(''),

      Guide_ship: new FormControl(''),
      Guide_ship_No: new FormControl(''),

      SET_Qualified: new FormControl(''),
      SET_Marks: new FormControl(''),
    });

    this.thirdFormGroup = this._formBuilder.group({
      Experience: new FormControl(''),
      Teaching_Experience: this._formBuilder.array([ ]),
      Industry_Experience: this._formBuilder.array([ ]),

      No_Of_FDP_Attended: new FormControl(''),
      No_Of_Workshop_Attended: new FormControl(''),
      No_Of_Conference_Attended: new FormControl(''),
      No_Of_Symposium_Attended: new FormControl(''),

      No_Of_FDP_Organized: new FormControl(''),
      No_Of_Workshop_Organized: new FormControl(''),
      No_Of_Conference_Organized: new FormControl(''),
      No_Of_Symposium_Organized: new FormControl(''),

      No_Of_Monograph_Published: new FormControl(''),
      No_Of_Books_Published: new FormControl(''),
      No_Of_Chapter_in_Inherited_Books: new FormControl(''),
      No_Of_Paper_Published_InJournals: new FormControl(''),
      No_Of_Papers_InConference: new FormControl(''),
      No_Of_Citations: new FormControl(''),
      No_Of_H_Index: new FormControl(''),
      No_Of_I10_Index: new FormControl(''),


      No_Of_Project_Guided_UG: new FormControl(''),
      No_Of_Project_Guided_PG: new FormControl(''),
      No_Of_Project_Guided_PHD: new FormControl(''),

      Patent: this._formBuilder.array([ ]),
      Achievements_Awards: this._formBuilder.array([ ]),

      Research_Found: new FormControl(''),
      Research_Found_Amount: new FormControl(''),
      Contact_Industries: new FormControl(''),
      Contact_Industries_Count: new FormControl(''),

      Interested_Game: new FormControl(''),
      Activities: new FormControl(''),
      Special_Achievements: new FormControl(''),
      Joining_Time: new FormControl(''),
      Expected_Salary: new FormControl(''),

    });
    this.Patent_Add();
    this.AchievementsAwards_Add();

    this.fourthFormGroup = this._formBuilder.group({
      Family_in_SNS: new FormControl(''),
      Family_in_SNS_Details: this._formBuilder.array([ ]),
      Reference1_Name: new FormControl(''),
      Reference2_Name: new FormControl(''),
      Reference1_Designation: new FormControl(''),
      Reference2_Designation: new FormControl(''),
      Reference1_Organization: new FormControl(''),
      Reference2_Organization: new FormControl(''),
      Reference1_Contact_Number: new FormControl(''),
      Reference2_Contact_Number: new FormControl(''),
      Reference1_Email_Id: new FormControl(''),
      Reference2_Email_Id: new FormControl(''),
      Place: new FormControl(''),
      Date: new FormControl(''),
    });

    if (this.Institute_Type === 'School') {
      this.FormGroup.controls['Preferred_Subject_1'].setValidators(Validators.required);
    }

  }


  Marital_Status_Change() {
    this.firstFormGroup.controls['Spouse_Name'].setValue('');
    this.firstFormGroup.controls['Spouse_Designation'].setValue('');
    this.firstFormGroup.controls['Spouse_Organization'].setValue('');
    this.firstFormGroup.controls['Spouse_Locality'].setValue('');
    this.firstFormGroup.controls['No_Of_Siblings'].setValue('');
    this.firstFormGroup.controls['No_Of_Kids'].setValue('');
    this.firstFormGroup.controls['No_Of_Kids'].setValue('');
    const arr = <FormArray>this.firstFormGroup.controls['kids_List'];
    arr.controls = [];
     const group = this.firstFormGroup.get('kids_List') as FormArray;
    this.firstFormGroup.value.kids_List = [];
    if (this.firstFormGroup.controls['Marital_Status'].value === 'Married') {
      this.firstFormGroup.controls['Spouse_Name'].setValidators(Validators.required);
    } else  {
      this.firstFormGroup.controls['Spouse_Name'].setValidators(null);
    }
    this.firstFormGroup.controls['Spouse_Name'].updateValueAndValidity();
  }

  Kits_FormArray(): FormGroup {
    return this._formBuilder.group({
      Kids_Name: new FormControl('', Validators.required),
      Kids_Age: new FormControl('', Validators.required),
      Kids_Gender: new FormControl('', Validators.required),
      Kids_Class_Course: new FormControl(''),
      Kids_School_College: new FormControl('')
    });
  }

  kids_change(event) {
    const arr = <FormArray>this.firstFormGroup.controls['kids_List'];
    arr.controls = [];
    this.firstFormGroup.value.kids_List = [];
    if (event !== '' && event > 0) {
      this.firstFormGroup.controls['kids_List'].setValidators(Validators.required);
      this.ShowKidsInfo = true;
      let i = 0;
      while ( i++ < event) {
        const group = this.firstFormGroup.get('kids_List') as FormArray;
        group.push(this.Kits_FormArray());
      }
    } else {
      this.firstFormGroup.controls['kids_List'].setValidators(null);
      this.ShowKidsInfo = false;
    }
  }

  CalculateAge(event) {
      const timeDiff = Math.abs(Date.now() - event);
      const age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
      this.firstFormGroup.controls['Age'].setValue(age);
  }

  checkAddress(event) {
    if (event) {
      this.firstFormGroup.controls['Present_Door_No'].setValue( this.firstFormGroup.controls['Permanent_Door_No'].value);
      this.firstFormGroup.controls['Present_Street'].setValue( this.firstFormGroup.controls['Permanent_Street'].value);
      this.firstFormGroup.controls['Present_City'].setValue( this.firstFormGroup.controls['Permanent_City'].value);
      this.firstFormGroup.controls['Present_Sate'].setValue( this.firstFormGroup.controls['Permanent_Sate'].value);
      this.firstFormGroup.controls['Present_Pin_Code'].setValue( this.firstFormGroup.controls['Permanent_Pin_Code'].value);
    } else {
      this.firstFormGroup.controls['Present_Door_No'].setValue('');
      this.firstFormGroup.controls['Present_Street'].setValue('');
      this.firstFormGroup.controls['Present_City'].setValue('');
      this.firstFormGroup.controls['Present_Pin_Code'].setValue('');
      this.PresentSate = '';
      this.firstFormGroup.controls['Present_Pin_Code'].setValue('');
    }
  }

  Experience_Change() {
    const old_array = <FormArray>this.thirdFormGroup.controls['Teaching_Experience']['controls'];
    const old_array_1 = <FormArray>this.thirdFormGroup.controls['Industry_Experience']['controls'];
    if (old_array.length <= 0 && old_array_1.length <= 0 && this.Experience_status === 'Experienced') {
      this.TeachingExperience_Add();
      this.IndustryExperience_Add();
    } else if (this.Experience_status === 'Fresher') {
      const old_array_length = old_array.length;
      let i = 0;
      while ( i++ <= old_array_length) {
        const Get_index = old_array_length - i;
        const cont = <FormArray>this.thirdFormGroup.controls['Teaching_Experience'];
        cont.removeAt(Get_index);
      }
      const old_array_length_1 = old_array_1.length;
      let j = 0;
      while ( j++ <= old_array_length_1) {
        const Get_index = old_array_length_1 - j;
        const cont = <FormArray>this.thirdFormGroup.controls['Industry_Experience'];
        cont.removeAt(Get_index);
      }

    }
  }


  TeachingExperience_FormArray(): FormGroup {
    return this._formBuilder.group({
      Institute_Name: new FormControl(''),
      Department: new FormControl(''),
      Designation: new FormControl(''),
      Responsibilities: new FormControl(''),
      Salary: new FormControl(''),
      Working_Duration_From: new FormControl(''),
      Working_Duration_To: new FormControl(''),
      Working_Duration: new FormControl('')
    });
  }
  TeachingExperience_Add() {
      const group = this.thirdFormGroup.get('Teaching_Experience') as FormArray;
      group.push(this.TeachingExperience_FormArray());
  }
  TeachingExperience_Remove(index: number) {
      const control = <FormArray>this.thirdFormGroup.controls['Teaching_Experience'];
      control.removeAt(index);
  }
  Calculate_Teaching_Duration(_type, _value, _index) {
      const from_Data = <FormArray>this.thirdFormGroup.controls['Teaching_Experience']['controls'][_index]['controls']['Working_Duration_From'];
      let from_time = 0;
      if (_type === 'From') {
        from_time = new Date(_value).getTime();
      } else {
        from_time = new Date(from_Data.value).getTime();
      }
      const To_Data = <FormArray>this.thirdFormGroup.controls['Teaching_Experience']['controls'][_index]['controls']['Working_Duration_To'];
      let to_time = 0;
      if (_type === 'To') {
        to_time = new Date(_value).getTime();
      } else {
        to_time = new Date(To_Data.value).getTime();
      }
        if (from_time > 0  && to_time > 0 ) {
          const diff: number = Math.floor(to_time - from_time);
          const day: number = 1000 * 60 * 60 * 24;
          const days: number = Math.floor(diff / day);
          const months: number = Math.floor(days / 30);
          const years: number = Math.floor(months / 12);
          let Duration = '';
          if (years <= 0) {
            if (months > 0) { Duration = months + 'months';
            } else if (days > 0) { Duration = days + 'days';
            } else { Duration = '0'; }
          } else {
            const if_month = months - (years * 12);
            if (if_month > 0) { Duration = years + 'years ' + if_month + 'months';
            } else { Duration = years + 'years'; }
          }
          const form_Control = <FormArray>this.thirdFormGroup.controls['Teaching_Experience']['controls'][_index]['controls']['Working_Duration'].setValue(Duration);
        }
  }

  IndustryExperience_FormArray(): FormGroup {
    return this._formBuilder.group({
      Industry_Name: new FormControl(''),
      Department: new FormControl(''),
      Designation: new FormControl(''),
      Responsibilities: new FormControl(''),
      Salary: new FormControl(''),
      Working_Duration_From: new FormControl(''),
      Working_Duration_To: new FormControl(''),
      Working_Duration: new FormControl('')
    });
  }
  IndustryExperience_Add() {
      const group = this.thirdFormGroup.get('Industry_Experience') as FormArray;
      group.push(this.IndustryExperience_FormArray());
  }
  IndustryExperience_Remove(index: number) {
      const control = <FormArray>this.thirdFormGroup.controls['Industry_Experience'];
      control.removeAt(index);
  }
  Calculate_Industry_Duration(_type, _value, _index) {
      const from_Data = <FormArray>this.thirdFormGroup.controls['Industry_Experience']['controls'][_index]['controls']['Working_Duration_From'];
      let from_time = 0;
      if (_type === 'From') {
        from_time = new Date(_value).getTime();
      } else {
        from_time = new Date(from_Data.value).getTime();
      }
      const To_Data = <FormArray>this.thirdFormGroup.controls['Industry_Experience']['controls'][_index]['controls']['Working_Duration_To'];
      let to_time = 0;
      if (_type === 'To') {
        to_time = new Date(_value).getTime();
      } else {
        to_time = new Date(To_Data.value).getTime();
      }
        if (from_time > 0  && to_time > 0 ) {
          const diff: number = Math.floor(to_time - from_time);
          const day: number = 1000 * 60 * 60 * 24;
          const days: number = Math.floor(diff / day);
          const months: number = Math.floor(days / 30);
          const years: number = Math.floor(months / 12);
          let Duration = '';
          if (years <= 0) {
            if (months > 0) { Duration = months + 'months';
            } else if (days > 0) { Duration = days + 'days';
            } else { Duration = '0'; }
          } else {
            const if_month = months - (years * 12);
            if (if_month > 0) { Duration = years + 'years ' + if_month + 'months';
            } else { Duration = years + 'years'; }
          }
          const form_Control = <FormArray>this.thirdFormGroup.controls['Industry_Experience']['controls'][_index]['controls']['Working_Duration'].setValue(Duration);
        }
  }



  Patent_FormArray(): FormGroup {
    return this._formBuilder.group({
      Title: new FormControl(''),
      Investigators: new FormControl(''),
      Patent_No: new FormControl(''),
      Status: new FormControl(''),
    });
  }
  Patent_Add() {
      const group = this.thirdFormGroup.get('Patent') as FormArray;
      group.push(this.Patent_FormArray());
  }
  Patent_Remove(index: number) {
      const control = <FormArray>this.thirdFormGroup.controls['Patent'];
      control.removeAt(index);
  }


  AchievementsAwards_FormArray(): FormGroup {
    return this._formBuilder.group({
      Category: new FormControl(''),
      Award_Achievement: new FormControl(''),
      Year: new FormControl(''),
    });
  }
  AchievementsAwards_Add() {
      const group = this.thirdFormGroup.get('Achievements_Awards') as FormArray;
      group.push(this.AchievementsAwards_FormArray());
  }
  AchievementsAwards_Remove(index: number) {
      const control = <FormArray>this.thirdFormGroup.controls['Achievements_Awards'];
      control.removeAt(index);
  }


  Family_in_SNS_Details_FormArray(): FormGroup {
    return this._formBuilder.group({
      Name: new FormControl(''),
      Institute: new FormControl(''),
      Designation: new FormControl(''),
      Responsibilities: new FormControl(''),
    });
  }
  Family_in_SNS_Details_Add() {
      const group = this.fourthFormGroup.get('Family_in_SNS_Details') as FormArray;
      group.push(this.Family_in_SNS_Details_FormArray());
  }
  Family_in_SNS_Details_Remove(index: number) {
      const control = <FormArray>this.fourthFormGroup.controls['Family_in_SNS_Details'];
      control.removeAt(index);
  }
  Family_in_SNS_Details_Change(value) {
    const old_array = <FormArray>this.fourthFormGroup.controls['Family_in_SNS_Details']['controls'];
    if (old_array.length <= 0 && value === 'Yes') {
      this.Family_in_SNS_Details_Add();
    } else if (value === 'No') {
      const old_array_length = old_array.length;
      let i = 0;
      while ( i++ <= old_array_length) {
        const Get_index = old_array_length - i;
        const cont = <FormArray>this.fourthFormGroup.controls['Family_in_SNS_Details'];
        cont.removeAt(Get_index);
      }
    }
  }


  _keyPress(event: any) {
    const pattern = /[0-9\.\-\+\ ]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }


  onUploadFileChange(event) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.type !== 'application/pdf') {
        this.Uploaded_File = null;
        this.Uploaded_File_alert = 'File format not valid!';
      } else if (file.size > 512000) {
        this.Uploaded_File = null;
        this.Uploaded_File_alert = 'Size more than "500KB"';
      } else {
        this.Uploaded_File_alert = '';
        this.Uploaded_File = file;
      }
    }
  }

  onUploadPhotoChange(event) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'image/png') {
        this.Uploaded_Photo = null;
        this.Uploaded_Photo_alert = 'File format not valid!';
      } else if (file.size > 204800) {
        this.Uploaded_Photo = null;
        this.Uploaded_Photo_alert = 'Size more than "200KB"';
      } else {
        this.Uploaded_Photo_alert = '';
        this.Uploaded_Photo = file;
      }
    }
  }

  onUploadSignChange(event) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'image/png') {
        this.Uploaded_Sign = null;
        this.Uploaded_Sign_alert = 'File format not valid!';
      } else if (file.size > 20480) {
        this.Uploaded_Sign = null;
        this.Uploaded_Sign_alert = 'Size more than "20KB"';
      } else {
        this.Uploaded_Sign_alert = '';
        this.Uploaded_Sign = file;
      }
    }
  }


  Submit_1() {
    this.FormGroup_Clicked = true;
  }
  Submit_2() {
    this.firstFormGroup_Clicked = true;
  }
  Submit_3() {
    console.log(this.secondFormGroup);
  }
  Submit_4() {
    console.log(this.thirdFormGroup.value);
  }


  Submit() {
    if (this.Uploaded_File && this.Uploaded_File !== '') {
      this.FormData.append('Uploaded_File', this.Uploaded_File, this.Uploaded_File.name);
    }
    if (this.Uploaded_Sign && this.Uploaded_Sign !== '') {
      this.FormData.append('Uploaded_File', this.Uploaded_Sign, this.Uploaded_Sign.name);
    }
    this.FormData.set('Basic_Info', JSON.stringify(this.FormGroup.value));
    this.FormData.set('Personal_Info', JSON.stringify(this.firstFormGroup.value));
    this.FormData.set('Education_Info', JSON.stringify(this.secondFormGroup.value));
    this.FormData.set('Activity_Info', JSON.stringify(this.thirdFormGroup.value));
    this.FormData.set('Reference_Info', JSON.stringify(this.fourthFormGroup.value));

    // this.Service.Online_Form_Submit(this.FormData).subscribe( datas => {
    //     if (datas['Status'] === 'True') {
          this.snackBar.open( 'You Application Successfully Submitted', ' ', {
            horizontalPosition: 'center',
            duration: 3000,
            verticalPosition: 'top',
          });
          this.router.navigate(['/']);
    //     }
    // });
  }

}
