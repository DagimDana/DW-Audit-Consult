export interface Database {
    public: {
      Tables: {
        contact_messages: {
          Row: {
            id: string;
            name: string;
            email: string;
            phone: string | null;
            subject: string;
            message: string;
            created_at: string;
          };
          Insert: {
            id?: string;
            name: string;
            email: string;
            phone?: string | null;
            subject: string;
            message: string;
            created_at?: string;
          };
        };
      };
    };
  }