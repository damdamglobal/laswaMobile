import { FlatList, Dimensions } from "react-native";
import { Text, View, Avatar } from "react-native-ui-lib";
import Sos from "../../components/sos";
import UserAvatar from "./UserAvatar";
import BoatCard from "./BoatCard";
import EmptyCard from "./EmptyCard";
import { actuatedNormalize } from "../../components/FontResponsive";
const { width, height } = Dimensions.get("window");

export default function Home(props) {
  return (
    <View flex padding-20 background-whiteColor>
      <View flex-1 row>
        <View flex left>
          <UserAvatar />
        </View>
        <View flex right>
          <Sos />
        </View>
      </View>
      <View flex-4>
        <View row>
          <View flex left>
            <Text subheading>My Fleet </Text>
          </View>
          <View flex right>
            <Text smallF>View all </Text>
          </View>
        </View>

        <FlatList
          //  onRefresh={() => getProduct(token, "reload")}
          //  refreshing={loading}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          horizontal={true}
          // snapToInterval={width - actuatedNormalize(100)}
          data={["", "", ""]}
          renderItem={({ item }) => <BoatCard props={props} item={item} />}
          ListEmptyComponent={() => <EmptyCard />}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
}
