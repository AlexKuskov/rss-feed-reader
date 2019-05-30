import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ChannelsComponent } from './components/channels/channels.component';
import { ChannelItemsComponent } from './components/channel-items/channel-items.component';
import { ItemContentComponent } from './components/item-content/item-content.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { ChannelsService } from './services/channels.service';

import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    ChannelsComponent,
    ChannelItemsComponent,
    ItemContentComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [ChannelsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
