import { ChannelPostData } from './ChannelPostData';
import { ChannelTitle } from './ChannelTitle';

export class ChannelData {
    feed: ChannelTitle;
    items: Array<ChannelPostData>;
}