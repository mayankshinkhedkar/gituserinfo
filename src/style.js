import Constants from './constants';

export default {
  container: {
    flex: 1,
    backgroundColor: Constants.appScreensBackgroundColor,
  },
  top10: {
    marginTop: 10
  },
  userImage: { 
    height: 200, 
    width: 200, 
    alignSelf: 'center' 
  },
  userName: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  repoMainView: {
    padding: 10,
    backgroundColor: '#CCCCCC'
  },
  repoText: {
    color: '#000000',
    fontSize: 16
  },
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  repoList: {
    padding: 10,
    flexDirection: 'column'
  },
  repoTitle: {
    color: '#000000',
    fontSize: 18
  },
  repoDes: {
    color: '#1E8AF1',
    fontSize: 15
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC",
  }
}