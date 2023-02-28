import Image from 'next/image'
import styles from '@/styles/Homepage.module.css'
import { useState, useEffect, useContext } from 'react'
import Link from 'next/link';
import { Category } from './Categorydata';

export default function Browsecategory () {


  return (
    <>
       <div className={styles.topmain4} >
            <h3 className={styles.topmainh} > Browse Categories </h3>
            <div className={styles.topmaincolumngrid} >
                { Category.map( (cat) => ( 
                <Link href={`/category/${cat.category}`} key={cat.category} >
                    <div className={styles.topmaindiv} key={cat.category} >
                        <img className={styles.topmainimg} src={cat.cover_picture} alt="" />
                        <p className={styles.topmainp} > {cat.category.charAt(0).toUpperCase()+cat.category.slice(1)} </p>
                    </div>
                </Link>    
                     ) ) }
            </div>
       </div>
    </>
  )
}