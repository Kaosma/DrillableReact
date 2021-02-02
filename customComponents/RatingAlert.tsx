import React from 'react';
import { Text, View, TouchableOpacity, Image, FlatList, TouchableWithoutFeedback, Animated } from 'react-native';
import { Easing } from 'react-native-reanimated';
//import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Star from './StarComponent';

export default class RatingAlert extends React.Component {

    state = {
        rating: this.props.rating ?? 0,
        animation: new Animated.Value(1)
    }

    rate = star => {
        this.setState({ rating:star})
    }

    animate = () => {
        Animated.timing(this.state.animation, {
            toValue: 2,
            duration: 400,
            //easing: Easing.ease,
            useNativeDriver: true
        }).start(() => {
            this.state.animation.setValue(1);
        })
    }

    render() {
        let stars = [];

        const animateScale = this.state.animation.interpolate({
            inputRange: [1, 1.5, 2],
            outputRange: [1, 1.4, 1]
        });
        
        const animateOpacity = this.state.animation.interpolate({
            inputRange: [1, 1.2, 2],
            outputRange: [1, 0.5, 1]
        });

        const animateWobble = this.state.animation.interpolate({
            inputRange: [1, 1.25, 1.75, 2],
            outputRange: ["0deg", "-3deg", "3deg", "0deg"]
        })
        const animationStyle = {
            transform: [{scale: animateScale}],
            opacity: animateOpacity
        };
        for (let x=1; x<=5; x++){
            stars.push(
                <TouchableWithoutFeedback 
                  key={x} 
                  onPress={() => {
                    this.rate(x),
                    this.animate();
                    console.log(x)
                }}>
                    <Animated.View style={x <= this.state.rating ? animationStyle : ""}>
                        <Star filled={x <= this.state.rating ? true : false}></Star>
                    </Animated.View>
                </TouchableWithoutFeedback>
            )
        }
        return(
            <View style={{backgroundColor:'#f4f4f4', borderRadius: 6, alignItems: 'center'}}>
                <Text style={{marginTop: 10, color:'#3a3535', fontFamily:'Roboto', fontWeight: '500', fontSize: 30}}>Rate this drill?</Text>

                <View style={{backgroundColor: '#3a3535', margin: 35, borderRadius: 20}}>
                    <View style={{flexDirection:'row', margin: 5}}>{stars}</View>
                </View>

                <View style={{flexDirection: 'row', alignItems:'center', width: '100%', justifyContent: 'space-between'}}>
                    <TouchableOpacity style={{margin: 15}}>
                        <Text style={{color:'#000000', fontFamily:'Roboto', fontSize: 25}}>Done</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{margin: 15}}>
                        <Text style={{color:'#000000', fontFamily:'Roboto', fontSize: 25}}>Cancel</Text>
                    </TouchableOpacity>
                </View>     
            </View>
        );
    }
}