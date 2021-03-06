import React from 'react';
import { Text, View, TouchableWithoutFeedback, Animated } from 'react-native';
import { Star } from '../StarComponent';

// Custom ratingmodal
export class RatingModal extends React.Component<{
  ratingCallback: (rating: number) => void;
  starRating: number;
}> {
  state = {
    rating: this.props.starRating ?? 0,
    animation: new Animated.Value(1),
  };

  rate = (star: any) => {
    this.setState({ rating: star });
  };

  animate = (num: number) => {
    Animated.timing(this.state.animation, {
      toValue: 2,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      this.state.animation.setValue(1);
      this.props.ratingCallback(num);
    });
  };

  render() {
    let stars = [];

    // Animations
    const animateScale = this.state.animation.interpolate({
      inputRange: [1, 1.5, 2],
      outputRange: [1, 1.4, 1],
    });

    const animateOpacity = this.state.animation.interpolate({
      inputRange: [1, 1.2, 2],
      outputRange: [1, 0.5, 1],
    });

    const animationStyle = {
      transform: [{ scale: animateScale }],
      opacity: animateOpacity,
    };

    // Creating the stars for the rating
    for (let x = 1; x <= 5; x++) {
      stars.push(
        <TouchableWithoutFeedback
          key={x}
          onPress={() => {
            this.rate(x), this.animate(x);
          }}
        >
          <Animated.View style={x <= this.state.rating ? animationStyle : ''}>
            <Star filled={x <= this.state.rating ? true : false} />
          </Animated.View>
        </TouchableWithoutFeedback>
      );
    }

    // Returning the rating modal
    return (
      <View style={{ margin: 35, alignItems: 'center' }}>
        <View style={{ backgroundColor: '#3a3535', borderRadius: 20 }}>
          <View style={{ flexDirection: 'row', margin: 5 }}>{stars}</View>
        </View>
        <Text style={{ marginTop: 5, fontSize: 15 }}>
          Rating: {this.state.rating} stars
        </Text>
      </View>
    );
  }
}
