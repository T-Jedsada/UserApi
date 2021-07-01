import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import ItemComponent from './ItemComponent';
import {Data} from './model/User';
import {Screen, ....} from './Home.view'

type ParamList = {
  MyData: {
    id: number;
    name: string;
    username: string;
    email: string;
  };
};

const fetchData = (): Promise<Data[]> => {
  return fetch('https://jsonplaceholder.typicode.com/users').then(res =>
    res.json(),
  );
};

const Home = () => {
  const [isError, setError] = useState(false);
  const [data, setData] = useState<Array<Data>>([]);
  const navigation = useNavigation();
  const route = useRoute<RouteProp<ParamList, 'MyData'>>();

  useEffect(() => {
    fetchData()
      .then(res => setData(res))
      .catch(e => setError(true));
  }, []);

  useEffect(() => {
    if (route.params) {
      setData((current: Array<Data>) => [
        ...current,
        {
          id: data.length + 1,
          name: route.params?.name,
          username: route.params?.username,
          email: route.params?.email,
        },
      ]);
    }
  }, [data.length, route.params]);

  return (
    <Screen>
      {data.length > 0 ? (
        <FlatList
          data={data}
          keyExtractor={(item: Data) => (item?.id ? item.id.toString() : '')}
          renderItem={(item: Data) => {
            return (
              <ListView>
                <ItemComponent
                  name={item.name}
                  username={item.username}
                  email={item.email}
                  onDelete={() =>
                    setData(
                      data.filter((target: Data) => target.id !== item.id),
                    )
                  }
                />
              </ListView>
            );
          }}
        />
      ) : (
        <View>Empty List</View>
      )}
      <FloatButtonStyle
        small
        icon="plus"
        onPress={() => navigation.navigate('InputScreen')}
      />
    </Screen>
  );
};
export default Home;
