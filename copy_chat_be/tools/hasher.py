import datetime
import hashlib
import random
from uuid import uuid4


class Hasher:
    @staticmethod
    def hash(length, string: str = str(uuid4())):
        """
        take string and return hash string
        """
        salt = str(datetime.datetime.now().timestamp()) + str(random.random())
        pre_hash = f"{salt}{string}"
        result = hashlib.md5(pre_hash.encode()).hexdigest()
        if length:
            return result[:length]
        return result
