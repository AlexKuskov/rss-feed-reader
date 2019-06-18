import { ChannelPostData } from './channel-post-data';
import { ChannelTitle } from './channel-title';

export class ChannelData {
    feed: ChannelTitle;
    items: Array<ChannelPostData>;
}