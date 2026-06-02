import  { useEffect} from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';  // Import the icon library


const Page = ({ route, navigation }) => {
  const { item } = route.params;

  useEffect(() => {
    if (item) {
      // Set header title and style dynamically
      navigation.setOptions({
        title: item.title,
        headerStyle: {
          backgroundColor: '#3B5C8E', // Change header background color
        },
        headerTintColor: '#fff', // Text color for header (title)
        headerTitleStyle: {
          fontWeight: 'bold', // Title font weight
          fontSize: 22, // Title font size
        },
      });
    }
  }, [item, navigation]);

  return (
    <>
    <ScrollView contentContainerStyle={{ paddingBottom: 100, backgroundColor:'#fff' }}>
        <Image source={typeof item.image === 'string' ? { uri: item.image } : item.image} style={styles.cardImage}/>

        <View style={{padding:10, flexDirection:'column', gap:15}}>
            <View style={{flexDirection:'column'}}>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.title}>{item.title}</Text>
            </View>

            <View>
              <Text style={styles.description}>{item.description}</Text>
            </View>


            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start', gap:'50%'}}>

                <View>
                  <Text style={styles.category}>Price</Text>
                  <View style={{flexDirection:'row', alignItems:'baseline', gap:5}}>
                      <Text style={styles.price}>{item.price}</Text>
                      <Text style={{color:'#3B5C8E'}}>/ Person</Text>
                  </View>
                </View>

                <View>
                  <Text style={styles.category}>Rating</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                      <Icon name="star" size={20} color="#4F6D9A"  />
                      <Text style={styles.rating}>{item.rating}</Text>
                  </View>
                </View>
            </View>


            <View style={{gap:5, alignItems:'flex-start'}}> 
              <View style={{flexDirection:'row',alignItems:'stretch' ,gap:5}}>
                  <Icon name="directions-bus" size={18} color="#4F6D9A" />
                  <Text style={styles.category}>Transit</Text>
              </View>
              <Text style={styles.description}>{item.transportation}</Text>
            </View>


            <View style={{gap:5, alignItems:'flex-start'}}> 
              <View style={{flexDirection:'row',alignItems:'stretch' ,gap:5}}>
                  <Icon name="calendar-month" size={18} color="#4F6D9A" />
                  <Text style={styles.category}>Drop By</Text>
              </View>
              <Text style={styles.description}>{item.working_hours}</Text>
            </View>

            <View style={{gap:5, alignItems:'flex-start'}}> 
              <View style={{flexDirection:'row',alignItems:'stretch' ,gap:5}}>
                  <Icon name="timelapse" size={18} color="#4F6D9A" />
                  <Text style={styles.category}>Allow <Text style={styles.description}>{item.suggested_duration}</Text> for a complete experience</Text>
              </View>
              
            </View>
        </View>
    </ScrollView>

    <BottomBar title={item.title}/>
    </>
  );
};

const styles = StyleSheet.create({
  cardImage: {
    width: '100%',
    height: 240,
  },title: {
    fontWeight: '700',
    fontSize: 24,
    marginBottom: 1,
    color: '#3B5C8E',
  },
  price: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 1,
    color: '#4F6D9A',
  },
  category: {
    fontWeight: '500',
    fontSize: 14,
    color: '#A6B1C1',
  },
  description: {
    fontSize: 14,
    color: '#5C6B82',
    marginBottom: 5,
  },
  rating: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4F6D9A', // Gold color for rating
  },
});

export default Page;
