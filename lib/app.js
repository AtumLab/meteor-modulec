	// Noi khoi tao App cho ca client va server
	new ModuleC('WEBAPP',{
		_init: function(){
			console.log('BlogJS app init');
			this.mainLayout = "main";
		}
	});
	WEBAPP.setConfigs({
		perPage: 3  
	});	
	new WEBAPP.Module('Post',{
		_init : function(){
			this.setData('PostModel', {
				title: "",	
				content: "",
				description: "",
				date: Date.now()
			});
		}
		/**
		getAll: function(){
			 interface
		}
		*/
	});
	new WEBAPP.Module('Account',{
		_init : function(){
			this.setData('AccountModel',{
				username: '',
				password: '',
				emails: '',
				/**				
				emails: [
					// each email address can only belong to one user.
					//{ address: "cool@example.com", verified: true },
					//{ address: "another@different.com", verified: false }
				],
				*/
				profile :{					
					avatar: '',
					introduce: '',
					contact: ''
				}
			});
		}
	});