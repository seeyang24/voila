import React, { Component } from 'react';
import { connect } from 'react-redux';
import VendorItem from './VendorItem';

//material-ui imports
import { List, ListItem } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';


class Vendor extends Component {
    state = {
        search: '',
    }

    updateSearch = (event) => {
        this.setState({ search: event.target.value.substr(0, 20) })
    }
    componentDidMount() {
        // use component did mount to dispatch an action to request the vendor list from the API
        this.getVendor();
    }
    getVendor() {
        this.props.dispatch({ type: 'FETCH_VENDOR' })
    }

//this function will filter through the list of admins on typing of a letter or name and will display by first name,last name,company name, and vendor type
//toLowerCase will make it not case sensitive
// on filter of the admins it will display only the names of the admin related to the letter inputted or name inputted
    mapVendors = () => {
        let filteredVendors = this.props.vendorList.values.filter(
            (vendor) => {
                return vendor.firstName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                    vendor.lastName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                    vendor.companyName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                    vendor.vendor_type_name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
            }
        )
        return (
            filteredVendors.map(vendor =>
                <ListItem key={vendor.id}>
                    <VendorItem vendor={vendor} getVendor={this.getVendor} />
                </ListItem>)
        )
    }
    render() {
        if (this.props.vendorList.loading) {
            return (
                <div>loading....... </div>
            )
        }
        return (
            <div>

                <TextField
                    label="Search Vendors"
                    value={this.state.search}
                    onChange={this.updateSearch.bind(this)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <List>
                    {this.mapVendors()}
                </List>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    state,
    vendorList: state.vendorList
});

export default connect(mapStateToProps)(Vendor);