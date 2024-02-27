import { Routes } from '@angular/router';
import path from 'path';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ToursComponent } from './components/admin-childs/tours/tours.component';
import { CategoriesComponent } from './components/admin-childs/categories/categories.component';
import { BookingsComponent } from './components/admin-childs/bookings/bookings.component';
import { ReviewsComponent } from './components/admin-childs/reviews/reviews.component';
import { UsersComponent } from './components/admin-childs/users/users.component';
import { UpdateusercomponentComponent } from './components/admin-childs/updateuser/updateuser.component';
import { AddCategoryComponent } from './components/admin-childs/add-category/add-category.component';
import { UpdatecategoryComponent } from './components/admin-childs/updatecategory/updatecategory.component';
import { CreateTourComponent } from './components/admin-childs/create-tour/create-tour.component';
import { UpdatetourComponent } from './components/admin-childs/updatetour/updatetour.component';
import { TourViewComponent } from './components/user_childs/tour-view/tour-view.component';
import { UserbookingsComponent } from './components/user_childs/userbookings/userbookings.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    children: [
      { path: 'tours', component: ToursComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'bookings', component: BookingsComponent },
      { path: 'reviews', component: ReviewsComponent },
      { path: 'users', component: UsersComponent },
      { path: 'update-user/:user_id', component: UpdateusercomponentComponent },
      { path: 'addcategory', component: AddCategoryComponent },
      {
        path: 'updatecategory/:category_id',
        component: UpdatecategoryComponent,
      },
      { path: 'createtour', component: CreateTourComponent },
      {
        path: 'updatetour/:tour_id',
        component: UpdatetourComponent,
      },
    ],
  },
  {
    path: 'user',
    component: UserDashboardComponent,
    children: [
      { path: 'tour-view', component: TourViewComponent },
      { path: 'user-booking', component: UserbookingsComponent },
    ],
  },
  { path: '**', component: NotfoundComponent },
];
