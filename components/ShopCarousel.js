import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Pressable,
} from 'react-native';
import Carousel from 'react-native-anchor-carousel';
import SimplePaginationDot from './SimplePaginationDots';

const {width: windowWidth} = Dimensions.get('window');

const ITEM_WIDTH = windowWidth;
const SEPARATOR_WIDTH = 10;


export default function ShopCarousel(props) {

  const {style, productImages, loading} = props;

  const data = []; //TODO: Placeholder?

productImages.forEach((val,index)=>{
   data.push({id:val, image:val})
 });

  const [currentIndex, setCurrentIndex] = useState(0);

  function handleCarouselScrollEnd(item, index) {
    setCurrentIndex(index);
  }

  const carouselRef = useRef(null);

  function renderHeader() {
    return (
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={{uri: 'https://i.imgur.com/WYCjkQz.jpg'}}
        />
        <View>
          <Text style={styles.name}>React Native Anchor Carousel</Text>
          <Text style={styles.descriptionText}>Sponsored</Text>
        </View>
      </View>
    );
  }

  function renderFooter() {
    return (
      <View style={styles.footer}>
        <Text style={styles.titleText}>Like</Text>

        <Text style={styles.titleText}>Comment</Text>

        <Text style={styles.titleText}>Share</Text>
      </View>
    );
  }

  function renderItem({item, index}) {
    const {image, title, url} = item;
    return (
      <Pressable
        activeOpacity={1}
        style={styles.item}
        onPress={() => {
          carouselRef.current.scrollToIndex(index);
        }}>
        <Image source={{uri: image}} style={[styles.image, {opacity:loading?0.5:1}]} />
      </Pressable>
    );
  }

  return (
    <View style={styles.container}>
      {/* {renderHeader()} */}
      <Carousel
        keyExtractor={item => item?.id}
        style={[styles.carousel, style]}
        ref={carouselRef}
        data={data}
        renderItem={renderItem}
        itemWidth={ITEM_WIDTH}
        separatorWidth={SEPARATOR_WIDTH}
        inActiveScale={1}
        inActiveOpacity={1}
        containerWidth={windowWidth}
        onScrollEnd={handleCarouselScrollEnd}
      />
      {/* {renderFooter()} */}
      <SimplePaginationDot currentIndex={currentIndex} length={data.length} style={{marginTop: 8, backgroundColor: 'transparent', height: 24}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    alignItems: 'flex-start',
    height: 'auto',
  },
  carousel: {
    width: windowWidth,
    height:ITEM_WIDTH,
    flexGrow: 0,
  },
  item: {
    backgroundColor: 'white',
    height: '98%',
    borderRadius: 5,
    borderColor: '#EAECEE',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#EBEBEB',
  },
  lowerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  lowerLeft: {
    width: '50%',
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1C2127',
    marginTop: 4,
  },
  descriptionText: {
    fontSize: 14,

    color: '#A0A0A0',
  },
  button: {
    width: '40%',
    marginLeft: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderColor: '#585B60',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#585B60',
  },
  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    marginTop: 20,
    marginHorizontal: 10,
    borderColor: '#A0A0A0',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
    borderColor: '#A0A0A0',
    paddingHorizontal: 10,
  },
  logo: {
    width: 40,
    aspectRatio: 1,
    borderRadius: 20,
    marginRight: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1C2127',
  },
});