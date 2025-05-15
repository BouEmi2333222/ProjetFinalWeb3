import Image from "next/image";
import styles from "./page.module.css";
import Header from "./reactComponents/Header.js"
import 'bootstrap/dist/css/bootstrap.css';
import Footer from "./reactComponents/Footer";
import Card from "./reactComponents/Card";
import Carousel from "./reactComponents/Carousel";
import ListCards from "./reactComponents/ListCards";

export default function Home() {
  return (<>
    <Header/>
    <Carousel/>
    <ListCards/>
    <Footer/>
    </>
  )
}
