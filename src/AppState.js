import {observable, autorun, action, reaction, computed} from 'mobx';
import {now} from 'mobx-utils'

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export default class Store {
    @observable clock = new ClockModel().timezone(0, this.cities[0]);
    @observable imageStore = new ImageStore();
    cities = [
        'Уагадугу',
        'Тунис',
        'Калининград',
        'Москва'
    ];

    constructor() {

        autorun('SYNCHRONIZE_OFFSET', () => {
            this.imageStore.offset = this.clock.offset
        });

        reaction(() => this.needChange, needChange => {
            if (needChange) {
                const rndTimezone = getRandomInt(0, 4);
                this.clock.timezone(rndTimezone, this.cities[rndTimezone]);
            }
        });
    }

    @computed get needChange() {
        return this.clock.seconds % 10 === 0
    }
}

class ClockModel {

    @observable timer;
    @observable offset;
    @observable city;

    constructor() {
        autorun('SET_CURRENT_TIME', () => {
            this.timer = now();
        });
    }

    @action timezone(offset, city) {
        this.offset = offset;
        this.city = city;
        return this;
    }

    @computed get hours() {
        return Math.floor((this.timer % DAY) / HOUR) + this.offset;
    }

    @computed get minutes() {
        return Math.floor((this.timer % HOUR) / MINUTE)
    }

    @computed get seconds() {
        return Math.floor((this.timer % MINUTE) / SECOND)
    }
}

class ImageStore {
    @observable offset = 0;
    urls = [
        'http://sputniknews-uz.com/images/48/44/484491.jpg',
        'http://mistral-club.ru/fs/site_documents/441_docfiles/tunis-1.jpeg',
        'https://tropki.ru/sites/default/files/styles/article/public/previews/772/kaliningrad.jpg',
        'http://www.tourprom.ru/site_media/images/upload/2016/8/30/resortimage/moskva-kremlj.jpg'
    ];

    @computed get url() {
        return 'url(' + this.urls[this.offset] + ')';
    }
}

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;