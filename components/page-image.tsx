import { If, Then, Else } from 'react-if';
interface PageImageProps {
  image?: string;
}

export const PageImage = (props: PageImageProps) => {
  const { image } = props;
  return (
    <If condition={Boolean(image)}>
      <Then>
        <div
          className='h-[400px] w-full bg-cover bg-center'
          style={{
            backgroundImage: `url(${image})`,
          }}
        />
      </Then>
      <Else>
        <></>
      </Else>
    </If>
  );
};
