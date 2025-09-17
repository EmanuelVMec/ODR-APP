import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const estilisequipo = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#1a2c6c',
    padding: 25,
    paddingTop: 40,
  },
  headerSubtitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  introSection: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff',
  },
  introLeft: {
    flex: 1,
    paddingRight: 10,
  },
  introRight: {
    flex: 1,
    paddingLeft: 10,
  },
  introSmallTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  introMainTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a2c6c',
  },
  introText: {
    fontSize: 14,
    color: '#2C3E50',
    lineHeight: 20,
  },
  profileInstruction: {
    padding: 15,
    backgroundColor: '#fff',
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a2c6c',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 15,
  },
  profilesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  profileContainer: {
    alignItems: 'center',
  },
  profileCard: {
    width: '100%',
    backgroundColor: '#f1f5ff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    minHeight: 120,
    justifyContent: 'center',
  },
  profileCardSingle: {
    width: '100%',
    backgroundColor: '#f1f5ff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    minHeight: 120,
    justifyContent: 'center',
  },
  profileFront: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a2c6c',
    textAlign: 'center',
    marginBottom: 5,
  },
  profileRole: {
    fontSize: 14,
    color: '#6046FF',
    textAlign: 'center',
  },
  contactSection: {
    backgroundColor: '#1a2c6c',
    padding: 30,
    alignItems: 'center',
  },
  contactTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  contactButton: {
    flexDirection: 'row',
    backgroundColor: '#6046FF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: 'center',
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 10,
  },
  footerTitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 5,
  },
  footerSubtitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  footer: {
    width: width,
    padding: 30,
    backgroundColor: '#1a2c6c',
    alignItems: 'center',
  },
  copyright: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
  contactInfo: {
    marginTop: 15,
    width: '100%',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    justifyContent: 'flex-start',
  },
  contactText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#fff',
    flex: 1,
    textAlign: 'left',
  },
  profilePhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  profileTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default estilisequipo;
