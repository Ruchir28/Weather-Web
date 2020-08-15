import React from 'react'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

const Loading = ({text}) => (
  <div>
    <Segment>
      <Dimmer active>
        <Loader>{text?text:"Loading..."}</Loader>
      </Dimmer>

      <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
    </Segment>
  </div>
)

export default Loading;