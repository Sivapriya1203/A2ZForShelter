import React from "react";
import { Container } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import HeroSection from "./HeroSection";
import PropertyGrid from "./PropertyGrid";
import Footer from "../Footer";
import AgentsSection from "./AgentsSection";
import CategoryHouse from "./CategoryHouse";
import CategoryCement from "./CategoryCement";
import CategoryStone from "./CategoryStone";
import CategorySand from "./CategorySand";
import CategoryWood from "./CategoryWood";
import CategoryPipeWire from "./CategoryPipewire";
import CategorySteel from "./CategorySteel";
import CategoryInterior from "./Categoryinterior";
import CategoryCatering from "./Categorycaterings";
import CategoryPgHostel from "./Categorypgs";

function HomePage() {
  return (
    <>
      <Navbar />
   
        <HeroSection />
        <PropertyGrid />

        <CategoryHouse />
        <CategoryPgHostel />
        <CategoryInterior />
        <CategoryCement />
        <CategoryStone />
        <CategorySand />
        <CategoryWood />
        <CategoryPipeWire />
        <CategorySteel />
        <CategoryCatering />

        <AgentsSection />
      <Footer />
    </>
  );
}

export default HomePage;
