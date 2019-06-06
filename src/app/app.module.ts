import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ChannelsComponent } from './components/channels/channels.component';
import { ChannelPostsComponent } from './components/channel-posts/channel-posts.component';
import { PostContentComponent } from './components/post-content/post-content.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { ChannelsService } from './services/channels.service';

import { ChartsModule } from 'ng2-charts';
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  declarations: [
    AppComponent,
    ChannelsComponent,
    ChannelPostsComponent,
    PostContentComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ChartsModule,
    FlexLayoutModule
  ],
  providers: [ChannelsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
