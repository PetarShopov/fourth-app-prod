import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { CostsComponent } from './costs/costs.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatTableModule, MatFormFieldModule, MatPaginatorModule, MatInputModule, MatCardModule, MatIconModule } from '@angular/material';

@NgModule({
	imports: [
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
		MatButtonModule,
		MatTableModule,
		MatFormFieldModule,
		MatPaginatorModule,
		MatInputModule,
		BrowserAnimationsModule,
		MatCardModule,
		MatIconModule,
		// The HttpClientInMemoryWebApiModule module intercepts HTTP requests
		// and returns simulated server responses.
		// Remove it when a real server is ready to receive requests.
		HttpClientInMemoryWebApiModule.forRoot(
			InMemoryDataService, { dataEncapsulation: false }
		)
	],
	declarations: [
		AppComponent,
		UsersComponent,
		UserDetailsComponent,
		CostsComponent
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
