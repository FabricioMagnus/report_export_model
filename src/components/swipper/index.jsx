// Importar componentes Swiper React
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

// Importar estilos do Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Capa from "../../pages/capa";
import { dataClient } from "../viewPDF/data/dataClient";
import { Flex, Text } from "@chakra-ui/react";

export default function SwiperBuilder({ components }) {
  return (
    <Swiper
      // Instalar os módulos do Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={2}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
    >
      {components &&
        components.map((component, index) => (
          <SwiperSlide key={index}>
            <Flex w={"100%"} h={"100%"} bgColor={"#b2b2b2"}>
              {component}
            </Flex>
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
