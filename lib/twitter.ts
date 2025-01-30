import { healthKeywords } from "@/utils/static";
export type influencerDataType = {
  tweets: string[],
  profile_image_url: string,
  username: string,
  most_recent_tweet_id: string,
  name: string,
  twitter_user_id: string,
  followers_count: number;
}


export async function fetchTweets(username: string): Promise<influencerDataType> {
  console.log('username', username);
  let userData
  const token = process.env.TWITTER_BEARER_TOKEN || "YOUR_STATIC_BEARER_TOKEN"; // Add your token
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Ensure username doesn't include the '@' symbol
  const formattedUsername = username.replace('@', '');
  console.log('formattedUsername', formattedUsername);

  // Step 1: Fetch user details to get the user ID
  const userUrl = `https://api.x.com/2/users/by/username/${formattedUsername}?user.fields=profile_image_url,name,public_metrics`;
  let userId: string;
  let followersCount: number;

  try {
    const userResponse = await fetch(userUrl, options);
    if (!userResponse.ok) {
      const errorDetails = await userResponse.json();
      console.error("Error Details:", errorDetails);
      throw new Error(`Request failed with status ${userResponse.status}: ${userResponse.statusText}`);
    }

    userData = await userResponse.json();
    console.log("User Data:", userData.data);
    userId = userData.data.id; // Extract the user ID
    followersCount = userData.data.public_metrics.followers_count;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }

  // Step 2: Fetch the user's recent tweets using their ID
  const tweetsUrl = `https://api.x.com/2/users/${userId}/tweets?max_results=5&tweet.fields=text`; // Fetch up to 10 recent tweets
  try {
    const tweetsResponse = await fetch(tweetsUrl, options);
    if (!tweetsResponse.ok) {
      const errorDetails = await tweetsResponse.json();
      console.error("Error Details:", errorDetails);
      throw new Error(`Request failed with status ${tweetsResponse.status}: ${tweetsResponse.statusText}`);
    }

    const tweetsData = await tweetsResponse.json();
    console.log("Tweets Data:", tweetsData);

    // Filter tweets to include only health-related ones
    // const healthKeywords = ["health", "nutrition", "medicine", "mental health", "diet", "exercise"];
    const healthRelatedTweets = tweetsData.data.filter((tweet: any) =>
      healthKeywords.some(keyword => tweet.text.toLowerCase().includes(keyword))
    );

    console.log("Health-Related Tweets:", healthRelatedTweets);

    // Return the influencer data
    const obj: influencerDataType = {
      tweets: healthRelatedTweets.map((tweet: any) => tweet.text),
      profile_image_url: userData.data.profile_image_url || 'demo.url.com',
      username: formattedUsername,
      most_recent_tweet_id: healthRelatedTweets[0]?.id || 'demo_tweet_id',
      name: userData.data.name || 'demo_name',
      twitter_user_id: userId,
      followers_count: followersCount
    };

    return obj;
  } catch (error) {
    console.error("Error fetching tweets:", error);
    throw error;
  }
}

// userid = 22238555





// response 

// Response Data: {
//   data: {
//     profile_image_url: 'https://pbs.twimg.com/profile_images/1343469870084743168/usJN9lJW_normal.jpg',
//     username: 'SantJohanna',
//     most_recent_tweet_id: '1880138301715411249',
//     name: 'Johanna Santanen',
//     id: '1491024776'
//   },
//   includes: { tweets: [ [Object] ] }
// }