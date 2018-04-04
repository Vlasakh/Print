What would the component definition look like for a React element like Twitter in this example?

```
<Twitter username='AssetBook'>
  {(user) => user === null
    ? <Loading />
    : <Profile info={user} />}
</Twitter>
```

```
import React, { Component, PropTypes } from 'react'
import fetchUser from 'twitterSource'
// fetchUser takes a username and returns a promise
// which will resolve with that username's data.

class Twitter extends Component {
  // finish this
}
```
