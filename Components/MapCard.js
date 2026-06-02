import { Image, Text, View, StyleSheet } from "react-native"
import Icon from 'react-native-vector-icons/Ionicons';

const MapCard = ({location}) => {
    return(
          <View style={styles.cardContainer}>
            <View style={{flexDirection:'row', alignItems:'center', position:'absolute',zIndex:2,marginTop:6, marginLeft:6, padding:4,backgroundColor:"#f2f2f2e1", borderRadius:16, gap:2 ,width:'auto'}}>
                <Icon name="calendar" size={14} color="#4F6D9A" />
                <Text style={{fontSize:10, color:"#4F6D9A", fontWeight:400}}>Planned for <Text style={{fontSize:10, color:"#4F6D9A", fontWeight:800}}>3 August 2025</Text></Text>
            </View>
            <Image source={{ uri: location.image }} style={styles.image} />
            <View style={{flexDirection:'row', alignItems:'center',position:'absolute', left:'81%', marginTop:6, marginLeft:6, gap:6}}>
              <View style={{backgroundColor:"#f2f2f2e1", borderRadius:20, padding:2, alignItems:'center', justifyContent:'center'}}>
                <Icon name="bookmark-outline" size={18} color="#4F6D9A" />
              </View>
              <View style={{backgroundColor:"#f2f2f2e1", borderRadius:20, padding:2, alignItems:'center', justifyContent:'center'}}>
                <Icon name="close-outline" size={18} color="#4F6D9A" />
              </View> 
            </View>
            <View style={styles.infoContainer}>
                <View style={{ flexDirection:'row', alignItems:'flex-start', justifyContent:'space-between'}}>
                    <View style={{width:'100%'}}>
                        <Text style={styles.category}>{location.category.slice(0, -1)}</Text>
                        <Text style={styles.title}>{location.title}</Text>
                    </View>
                </View>

                <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'flex-start', gap:8}}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap:2, padding:6, backgroundColor:"#698abdff", borderRadius:16 }}>
                      <Icon name="wallet" size={12} color="#f2f2f2" />
                      <Text style={styles.price}>{location.price}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap:2, padding:6, backgroundColor:"#698abdff", borderRadius:16}}>
                      <Icon name="star" size={12} color="#f2f2f2" />
                      <Text style={styles.rating}>{location.rating}</Text>
                  </View>

                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  cardContainer:{
    flexDirection:'column',
    width:'90%',
    height:300,
    position:'absolute',
    bottom:'15%',
    left:'5%',
    backgroundColor:'#fff',
    borderRadius:10,
    elevation:5
  },
  infoContainer: {
    flexDirection:'column',
    gap:8,
    height:'40%',
    justifyContent:"space-evenly",
    paddingVertical:8,
    paddingHorizontal:8
  },
  image: {
    width:'100%',
    height:'60%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    objectFit:'cover',
    },
  title: {
    fontWeight: '600',
    fontSize: 16,
    color: '#4F6D9A',
    flexShrink: 1,
  },
  price: {
    fontWeight: '300',
    fontSize: 12,
    color: '#f2f2f2',
  },  
  category: {
    fontWeight: '400',
    fontSize: 12,
    color: '#A6B1C1',
  },
  rating: {
    fontSize: 12,
    fontWeight: '300',
    color: '#f2f2f2',
  },
})


export default MapCard