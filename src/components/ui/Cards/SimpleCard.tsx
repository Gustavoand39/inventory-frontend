import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

interface ISimpleCard {
  index: number;
  item: {
    img?: string;
    title: string;
    price: string;
  };
}

const SimpleCard = ({ index, item }: ISimpleCard) => {
  return (
    <Card
      shadow="sm"
      key={index}
      isPressable
      onPress={() => console.log("item pressed")}
    >
      <CardBody className="overflow-visible p-0">
        <Image
          shadow="sm"
          radius="lg"
          width="100%"
          alt={item.title}
          className="w-full object-cover h-[140px]"
          src={item.img}
        />
      </CardBody>

      <CardFooter className="text-small justify-between">
        <b>{item.title}</b>
        <p className="text-default-500">{item.price}</p>
      </CardFooter>
    </Card>
  );
};

export default SimpleCard;
