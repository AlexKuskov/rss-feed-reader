import { SafeHtml } from '@angular/platform-browser';

export class ChannelPostData {
    title: string;
    content: SafeHtml;
    categories: string[];
    pubDate: string;
    link: string;
    author: string;
}