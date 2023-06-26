// Importar componentes Swiper React
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

// Importar estilos do Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Flex } from "@chakra-ui/react";

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
      onSwiper={(swiper) => {}}
      onSlideChange={() => {}}
    >
      {components &&
        components.map((component, index) => (
          <SwiperSlide key={index}>
            <Flex w={"100%"} h={"100%"} bgColor={"#4e4e4e"}>
              {component}
            </Flex>
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
