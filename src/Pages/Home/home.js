import React from 'react';
import styles from './home.sytles.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
//  Images
import reactImage from '../../assets/Images/react.png';
import shopImage from '../../assets/Images/shop.png';
import githubImage from '../../assets/Images/github.png';
import manImage from '../../assets/Images/man.png';
// Import Swiper
import SwiperCore, { Pagination } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import { Button } from '@material-ui/core';

SwiperCore.use([Pagination]);

function Home() {
  return (
    <div>
      <Swiper slidesPerView={1} pagination={{ clickable: true }}>
        <SwiperSlide>
          <div className={styles.theSlide}>
            <div className={styles.image}>
              <img src={reactImage} alt='react logo' />
            </div>
            <div className={styles.content}>
              این سایت یک نمونه کار فروشگاهی React انجام شده توسط مسعود مهاجری
              است .
              <br /> لطفا تحریم شکنتون روشن باشه و اسلاید های بعد رو هم ببینید
              👈
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.theSlide}>
            <div className={styles.image}>
              <img src={shopImage} alt='' />
            </div>
            <div className={styles.content}>
              قابلیت ها :
              <br />
              شما میتوانید تحت عنوان ادمین و یا مشتری ثبت نام کنید . ادمین
              میتواند به فروشگاه کالا اضافه کند و یا کالا های موجود را اصلاح کند
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.theSlide}>
            <div className={styles.image}>
              <img src={shopImage} alt='' />
            </div>
            <div className={styles.content}>
              ادمین همچنین میتواند پس از ثبت کد رهگیری پستی وضعیت سفارشات را از
              حالت پردازش انبار به حالت ارسال شده درآورد و مشتری هم میتواند
              وضعیت سفارش های خود را از پنل خود مشاهده کند .
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.theSlide}>
            <div className={styles.image}>
              <img src={manImage} alt='' />
            </div>
            <div className={styles.content}>
              میتوانید از ایمیل های زیر برای تست برنامه استفاده کنید ( صد البته
              که میتوانید ثبت نام هم کنید ! ) :
              <br />
              ادمین : admin@test.test
              <br />
              مشتری : test@test.test
              <br />
              رمز : 123123
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.theSlide}>
            <div className={styles.image}>
              <img src={githubImage} alt='' />
            </div>
            <div className={styles.content}>
              میتونید از
              <a href='https://github.com/mohajerimasoud' target='_blank'>
                اینجا
              </a>
              هم به صفحه گیت هاب م سر بزنید و کد این پروژه و دیگر پروژه ها رو هم
              ببینید
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Home;
