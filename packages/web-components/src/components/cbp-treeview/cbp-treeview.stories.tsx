export default {
    title: 'Components/Treeview',
    tags: ['new'],
    argTypes: {
        label : {
            description: 'Specifies Text for the Treeview, is displayed with the treeview-controls',
            control: 'text',
        },
        open: {
            description: 'Specifies if the treeview content is visiblie/expanded',
            control: 'boolean',
        },
        context: {
            control: 'select',
            options: [ "light-inverts", "light-always", "dark-inverts", "dark-always"]
        },
        sx: {
            description: 'Supports adding inline styles as an object of key-value pairs comprised of CSS properties and values. Values should reference design tokens when possible.',
            control: 'object',
        },
    },
  };

const Template = ({ label, open, context, sx }) => {
    return ` 
        <cbp-treeview>
            <cbp-treeview-item
                ${label ? `label="${label}"` : ""}
                ${open}    
                ${context && context != 'light-inverts' ? `context=${context}` : ''}
                ${sx ? `sx=${JSON.stringify(sx)}` : ''}
            >
                <cbp-checkbox slot="treeview-checkbox-control" value="1">
                    <input type="checkbox" name="checkbox" value="1">
                </cbp-checkbox>

                <cbp-treeview-item
                    label="Parent level B"
                >
                    
                    <cbp-checkbox slot="treeview-checkbox-control" value="2">
                        <input type="checkbox" name="checkbox" value="2">
                    </cbp-checkbox>

                    <cbp-treeview-item
                        label="Parent level C"
                    >
                        
                        <cbp-checkbox slot="treeview-checkbox-control" value="2">
                            <input type="checkbox" name="checkbox" value="2">
                        </cbp-checkbox>

                        <cbp-treeview-item
                            label="Parent level D"
                        >
                            
                            <cbp-checkbox slot="treeview-checkbox-control" value="2">
                                <input type="checkbox" name="checkbox" value="2">
                            </cbp-checkbox>

                            
                            <cbp-treeview-item
                                label="Child level E"
                            >
                                <cbp-button slot="treeview-button-control" type="button" fill="solid" color="primary"><button type="button" >                
                                Default
                                </button></cbp-button>
                                <span>test</span>
                            </cbp-treeview-item>

                            <cbp-treeview-item
                                label="Child level E"
                            >
                                <cbp-button slot="treeview-button-control" type="button" fill="solid" color="primary"><button type="button" >                
                                Default
                                </button></cbp-button>
                                <span>test 2</span>
                            </cbp-treeview-item>
                        </cbp-treeview-item>
                        <cbp-treeview-item
                            label="Parent level D"
                        >
                            <cbp-checkbox slot="treeview-checkbox-control" value="2">
                                <input type="checkbox" name="checkbox" value="2">
                            </cbp-checkbox>
                        </cbp-treeview-item>
                    </cbp-treeview-item>
                    <cbp-treeview-item
                        label="Parent level C"
                    >
                        
                        <cbp-checkbox slot="treeview-checkbox-control" value="2">
                            <input type="checkbox" name="checkbox" value="2">
                        </cbp-checkbox>
                    </cbp-treeview-item>
                </cbp-treeview-item>
                <cbp-treeview-item
                    label="Parent level B"
                >
                    
                    <cbp-checkbox slot="treeview-checkbox-control" value="2">
                        <input type="checkbox" name="checkbox" value="2">
                    </cbp-checkbox>
                </cbp-treeview-item>
            </cbp-treeview-item>
            <cbp-treeview-item
                label="Parent level A"
            >
                
                <cbp-checkbox slot="treeview-checkbox-control" value="2">
                    <input type="checkbox" name="checkbox" value="2">
                </cbp-checkbox>
            </cbp-treeview-item>
        </cbp-treeview>
    `;
};


export const Treeview = Template.bind({});
  
Treeview.args = {
    label: `Parent Level A`,
}
